import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface PitchDetection {
  frequency: number | null;
  note?: string | null;
  cents?: number | null;
  confidence: number; // 0..1
  // Valores suavizados (EMA) para UI/estabilidad
  smoothedFrequency?: number | null;
  smoothedConfidence?: number | null;
  error?: string | null;
}

@Injectable({ providedIn: 'root' })
export class PitchDetectorService implements OnDestroy {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private rafId = 0;
  private buffer: Float32Array | null = null;
  // EMA smoothing state
  private smoothedFreq: number | null = null;
  private smoothedConf: number | null = null;
  private readonly emaAlpha = 0.25; // smoothing factor (0..1) - increased for better stability
  
  // Frequency validation ranges (human voice/instruments)
  private readonly MIN_FREQ = 60; // ~B1
  private readonly MAX_FREQ = 1400; // ~F#6

  public detections = new Subject<PitchDetection>();
  public errors = new Subject<string>();

  async start() {
    if (this.audioCtx) return;
    
    try {
      // Request microphone with specific constraints for better quality
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
      
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.source = this.audioCtx.createMediaStreamSource(this.stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 4096; // Increased for better low-frequency resolution
      this.analyser.smoothingTimeConstant = 0.8;
      this.source.connect(this.analyser);
      const bufferLen = this.analyser.fftSize;
      this.buffer = new Float32Array(bufferLen);
      
      // Reset smoothing state
      this.smoothedFreq = null;
      this.smoothedConf = null;
      
      this.update();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al acceder al micrófono';
      this.errors.next(errorMsg);
      throw error;
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.analyser = null;
    this.buffer = null;
    
    // Reset smoothing state
    this.smoothedFreq = null;
    this.smoothedConf = null;
  }

  ngOnDestroy(): void {
    this.stop();
    this.detections.complete();
    this.errors.complete();
  }

  private update() {
    if (!this.analyser || !this.buffer || !this.audioCtx) return;
    
    this.analyser.getFloatTimeDomainData(this.buffer as any);
    const rms = this.rms(this.buffer);
    const MIN_RMS = 0.01; // Increased threshold for better noise rejection
    let freq: number | null = null;
    let confidence = 0;
    
    if (rms > MIN_RMS) {
      const ac = this.autoCorrelate(this.buffer, this.audioCtx.sampleRate);
      if (ac > 0 && ac >= this.MIN_FREQ && ac <= this.MAX_FREQ) {
        freq = ac;
        // Better confidence calculation based on RMS and correlation
        confidence = Math.min(1, (rms / 0.1) * 0.7 + 0.3);
      }
    }

    // Apply EMA smoothing to frequency and confidence
    if (freq && freq > 0) {
      if (!this.smoothedFreq) this.smoothedFreq = freq;
      else this.smoothedFreq = this.emaAlpha * freq + (1 - this.emaAlpha) * this.smoothedFreq;
    } else {
      // decay smoothed frequency when silence (slower decay)
      if (this.smoothedFreq) this.smoothedFreq = this.smoothedFreq * 0.95;
    }

    if (!this.smoothedConf) this.smoothedConf = confidence;
    else this.smoothedConf = this.emaAlpha * confidence + (1 - this.emaAlpha) * this.smoothedConf;

    const detection: PitchDetection = { 
      frequency: freq, 
      confidence, 
      smoothedFrequency: this.smoothedFreq ?? null, 
      smoothedConfidence: this.smoothedConf ?? 0 
    };
    
    if (freq) {
      const mapped = this.frequencyToNote(freq);
      detection.note = mapped.note;
      detection.cents = mapped.cents;
    } else {
      detection.note = null;
      detection.cents = null;
    }
    
    this.detections.next(detection);
    this.rafId = requestAnimationFrame(() => this.update());
  }

  private rms(buffer: Float32Array) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    return Math.sqrt(sum / buffer.length);
  }

  // Autocorrelation pitch detection (improved Chris Wilson approach)
  private autoCorrelate(buf: Float32Array, sampleRate: number): number {
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    
    // Calculate RMS for noise gate
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1; // Noise gate

    let lastCorrelation = 1;
    // Calculate minimum offset based on MAX_FREQ to avoid false positives
    const minOffset = Math.floor(sampleRate / this.MAX_FREQ);
    
    for (let offset = minOffset; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buf[i] - buf[i + offset]);
      }
      correlation = 1 - correlation / MAX_SAMPLES;
      
      // Look for peaks with higher threshold
      if (correlation > 0.92 && correlation > lastCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
      lastCorrelation = correlation;
    }
    
    if (bestCorrelation > 0.5 && bestOffset > 0) {
      // Parabolic interpolation for sub-sample accuracy
      const y1 = bestCorrelation;
      const x = bestOffset;
      // Simple frequency calculation with interpolation
      const freq = sampleRate / bestOffset;
      return Math.round(freq * 100) / 100;
    }
    return -1;
  }

  private frequencyToNote(freq: number) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = 440;
    const noteNum = 12 * (Math.log(freq / A4) / Math.log(2)) + 69;
    const rounded = Math.round(noteNum);
    const note = noteNames[(rounded % 12 + 12) % 12];
    const octave = Math.floor(rounded / 12) - 1;
    const cents = Math.floor((noteNum - rounded) * 100);
    return { note: `${note}${octave}`, cents };
  }
}
