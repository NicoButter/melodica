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
  private readonly emaAlpha = 0.22; // smoothing factor (0..1)

  public detections = new Subject<PitchDetection>();

  async start() {
    if (this.audioCtx) return;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.source = this.audioCtx.createMediaStreamSource(this.stream);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source.connect(this.analyser);
    const bufferLen = this.analyser.fftSize;
    this.buffer = new Float32Array(bufferLen);
    this.update();
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.analyser = null;
    this.source = null;
    this.buffer = null;
  }

  ngOnDestroy(): void {
    this.stop();
    this.detections.complete();
  }

  private update() {
    if (!this.analyser || !this.buffer || !this.audioCtx) return;
    // TypeScript/DOM lib types can be strict about ArrayBuffer vs SharedArrayBuffer.
    // Cast to any to avoid incompatible generic signature issues at compile time.
    this.analyser.getFloatTimeDomainData(this.buffer as any);
    const rms = this.rms(this.buffer);
    const MIN_RMS = 0.002; // threshold
    let freq: number | null = null;
    let confidence = 0;
    if (rms > MIN_RMS) {
      const ac = this.autoCorrelate(this.buffer, this.audioCtx.sampleRate);
      if (ac > 0) {
        freq = ac;
        confidence = Math.min(1, (rms / 0.05));
      }
    }

    // Apply EMA smoothing to frequency and confidence
    if (freq && freq > 0) {
      if (!this.smoothedFreq) this.smoothedFreq = freq;
      else this.smoothedFreq = this.emaAlpha * freq + (1 - this.emaAlpha) * this.smoothedFreq;
    } else {
      // decay smoothed frequency when silence
      if (this.smoothedFreq) this.smoothedFreq = this.smoothedFreq * 0.98;
    }

    if (!this.smoothedConf) this.smoothedConf = confidence;
    else this.smoothedConf = this.emaAlpha * confidence + (1 - this.emaAlpha) * this.smoothedConf;

    const detection = { frequency: freq, confidence, smoothedFrequency: this.smoothedFreq ?? null, smoothedConfidence: this.smoothedConf ?? 0 } as PitchDetection;
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

  // Autocorrelation pitch detection (Chris Wilson approach)
  private autoCorrelate(buf: Float32Array, sampleRate: number) {
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.001) return -1;

    let lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buf[i] - buf[i + offset]);
      }
      correlation = 1 - correlation / MAX_SAMPLES;
      if (correlation > 0.9 && correlation > lastCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
      lastCorrelation = correlation;
    }
    if (bestCorrelation > 0.01 && bestOffset > 0) {
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
