import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PitchDetectorService, PitchDetection } from '../../../core/services/pitch-detector.service';

@Component({
  selector: 'mic-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mic-capture.component.html',
  styleUrls: ['./mic-capture.component.scss']
})
export class MicCaptureComponent implements OnDestroy {
  @Output() detected = new EventEmitter<PitchDetection>();
  @Output() confirmed = new EventEmitter<PitchDetection>();

  public running = false;
  public last: PitchDetection = { frequency: null, note: null, cents: null, confidence: 0, smoothedFrequency: null, smoothedConfidence: 0 };
  public locked = false; // cuando true, no actualiza la última detección

  constructor(private pitch: PitchDetectorService) {
    this.pitch.detections.subscribe((d: PitchDetection) => {
      // Si está bloqueado, no actualizamos ni emitimos
      if (this.locked) return;
      // Guardamos la detección suavizada si existe
      this.last = {
        frequency: d.frequency,
        note: d.note ?? null,
        cents: d.cents ?? null,
        confidence: d.confidence,
        smoothedFrequency: d.smoothedFrequency ?? null,
        smoothedConfidence: d.smoothedConfidence ?? 0
      };
      this.detected.emit(this.last);
    });
  }

  async start() {
    await this.pitch.start();
    this.running = true;
  }

  stop() {
    this.pitch.stop();
    this.running = false;
  }

  useDetected() {
    // emits a confirmed detection (user pressed 'Usar detección')
    this.confirmed.emit(this.last);
  }

  toggleLock() {
    this.locked = !this.locked;
  }

  // Helpers para plantilla que evitan verificaciones nulas en expressions
  get smoothedConfPercent(): number {
    const conf = this.last.smoothedConfidence ?? this.last.confidence ?? 0;
    return Math.max(0, Math.min(100, Math.round(conf * 100)));
  }

  get smoothedFreqDisplay(): string {
    return this.last.smoothedFrequency ? `${Math.round(this.last.smoothedFrequency)} Hz` : '-';
  }

  ngOnDestroy(): void {
    this.pitch.stop();
  }
}
