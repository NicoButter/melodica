import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PitchDetectorService, PitchDetection } from '../../core/services/pitch-detector.service';
import { NoteDetectorService } from './note-detector.service';
import { MicCaptureComponent } from '../../shared/components/mic-capture/mic-capture.component';

@Component({
  selector: 'app-note-detector',
  standalone: true,
  imports: [CommonModule, MicCaptureComponent],
  templateUrl: './note-detector.component.html',
  styleUrls: ['./note-detector.component.scss'],
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class NoteDetectorComponent implements OnInit, OnDestroy {
  currentDetection: PitchDetection | null = null;
  detectionHistory: Array<{ note: string; timestamp: number }> = [];
  suggestedProgressions: string[][] = [];
  harmonyType: 'major' | 'minor' | 'mixed' = 'major';
  isRecording = false;

  constructor(
    private pitchDetector: PitchDetectorService,
    private noteDetector: NoteDetectorService
  ) {}

  ngOnInit(): void {
    // Component ready
  }

  ngOnDestroy(): void {
    this.stopRecording();
    document.body.classList.remove('scrolled');
  }

  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }

  startRecording(): void {
    this.isRecording = true;
    this.detectionHistory = [];
  }

  stopRecording(): void {
    this.isRecording = false;
  }

  onDetectionUpdate(detection: PitchDetection): void {
    this.currentDetection = detection;

    // Solo procesar si hay buena confianza y nota válida
    if (detection.note && detection.confidence > 0.5) {
      const state = this.noteDetector.processDetection(detection.note, detection.confidence);
      this.suggestedProgressions = state.suggestedProgressions || [];

      // Agregar al historial solo si la confianza es alta
      if (detection.confidence > 0.7) {
        if (!this.detectionHistory.length || 
            this.detectionHistory[this.detectionHistory.length - 1].note !== detection.note) {
          this.detectionHistory.push({
            note: detection.note,
            timestamp: Date.now()
          });

          // Limitar historial a últimas 20 detecciones
          if (this.detectionHistory.length > 20) {
            this.detectionHistory.shift();
          }
        }
      }
    }
  }

  changeHarmonyType(type: 'major' | 'minor' | 'mixed'): void {
    this.harmonyType = type;
    this.noteDetector.setHarmonyType(type);

    if (this.currentDetection?.note) {
      const state = this.noteDetector.processDetection(
        this.currentDetection.note,
        this.currentDetection.confidence
      );
      this.suggestedProgressions = state.suggestedProgressions || [];
    }
  }

  getConfidencePercentage(): number {
    if (!this.currentDetection) return 0;
    const conf = this.currentDetection.smoothedConfidence ?? this.currentDetection.confidence ?? 0;
    return Math.round(Math.max(0, Math.min(100, conf * 100)));
  }

  getConfidenceColor(): string {
    const percentage = this.getConfidencePercentage();
    if (percentage < 50) return '#ef4444';
    if (percentage < 80) return '#eab308';
    return '#10b981';
  }

  copyProgression(progression: string[]): void {
    const text = this.noteDetector.formatProgression(progression);
    navigator.clipboard.writeText(text).then(() => {
      alert('Progresión copiada al portapapeles');
    });
  }

  formatNote(note: string | null | undefined): string {
    return note || 'Sin detectar';
  }

  formatProgression(progression: string[]): string {
    return this.noteDetector.formatProgression(progression);
  }
}
