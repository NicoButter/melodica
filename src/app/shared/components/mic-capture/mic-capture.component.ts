import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
  public locked = false;
  public errorMessage: string | null = null;
  
  private detectionSubscription?: Subscription;
  private errorSubscription?: Subscription;

  constructor(private pitch: PitchDetectorService) {
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    this.detectionSubscription = this.pitch.detections.subscribe((d: PitchDetection) => {
      if (this.locked) return;
      
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

    this.errorSubscription = this.pitch.errors.subscribe((error: string) => {
      this.errorMessage = error;
      this.running = false;
    });
  }

  async start() {
    try {
      this.errorMessage = null;
      await this.pitch.start();
      this.running = true;
    } catch (error) {
      this.errorMessage = 'No se pudo acceder al micrófono. Verifica los permisos.';
      this.running = false;
    }
  }

  stop() {
    this.pitch.stop();
    this.running = false;
    this.errorMessage = null;
  }

  useDetected() {
    if (!this.last.note || !this.last.frequency) {
      this.errorMessage = 'No hay detección válida para confirmar';
      return;
    }
    this.confirmed.emit(this.last);
  }

  toggleLock() {
    this.locked = !this.locked;
  }

  clearError() {
    this.errorMessage = null;
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
    this.detectionSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }
}
