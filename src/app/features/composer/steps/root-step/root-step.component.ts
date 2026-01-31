import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService, RootNote } from '../../services/composer.service';
import { MicCaptureComponent } from '../../../../shared/components/mic-capture/mic-capture.component';
import { PitchDetection } from '../../../../services/pitch-detector.service';

@Component({
  selector: 'app-root-step',
  standalone: true,
  imports: [CommonModule, MicCaptureComponent],
  templateUrl: './root-step.component.html',
  styleUrls: ['./root-step.component.scss']
})
export class RootStepComponent {
  @Output() stepCompleted = new EventEmitter<void>();

  roots: { value: RootNote; label: string; description: string }[] = [
    { value: 'C', label: 'Do (C)', description: 'La más común, sonido natural' },
    { value: 'D', label: 'Re (D)', description: 'Brillante y energética' },
    { value: 'E', label: 'Mi (E)', description: 'Poderosa y expresiva' },
    { value: 'F', label: 'Fa (F)', description: 'Suave y melódica' },
    { value: 'G', label: 'Sol (G)', description: 'Cálida y equilibrada' },
    { value: 'A', label: 'La (A)', description: 'Clara y resonante' },
    { value: 'B', label: 'Si (B)', description: 'Intensa y dramática' },
    { value: 'Bb', label: 'Si bemol (Bb)', description: 'Suave y nostálgica' },
    { value: 'Eb', label: 'Mi bemol (Eb)', description: 'Elegante y sofisticada' },
    { value: 'F#', label: 'Fa sostenido (F#)', description: 'Aguda y misteriosa' }
  ];

  selectedRoot: RootNote | null = null;

  constructor(private composerService: ComposerService) {}

  // Preview de la detección (actualizaciones en tiempo real)
  public micPreview: PitchDetection | null = null;

  // Handler para detecciones continuas (solo preview)
  onMicDetected(detection: PitchDetection) {
    this.micPreview = detection;
  }

  // Handler cuando el usuario confirma la detección desde `MicCapture`
  onMicConfirmed(detection: PitchDetection) {
    if (!detection || !detection.note) return;
    const mapped = this.mapDetectedToRoot(detection.note);
    if (mapped) {
      this.selectedRoot = mapped;
      this.composerService.setRoot(mapped);
      // Consideramos la acción de "Usar detección" como completar el paso
      this.stepCompleted.emit();
    }
  }

  private mapDetectedToRoot(noteWithOctave: string): RootNote | null {
    // extrae la parte de nota (sin octava), por ejemplo 'A#4' -> 'A#'
    const noteName = noteWithOctave.replace(/[0-9]/g, '');
    const allowed = this.composerService.getAvailableRoots();

    // Normal match
    if ((allowed as string[]).includes(noteName)) return noteName as RootNote;

    // Mapas simples de enarmónicos / fallback
    const enharmonic: Record<string, RootNote> = {
      'A#': 'Bb',
      'D#': 'Eb',
      'C#': 'C',
      'G#': 'G',
      'E#': 'F',
      'B#': 'C'
    };

    if (enharmonic[noteName]) return enharmonic[noteName];

    // Último recurso: usar la letra base sin alteraciones
    const base = noteName.charAt(0);
    if ((allowed as string[]).includes(base)) return base as RootNote;

    return null;
  }

  selectRoot(root: RootNote): void {
    this.selectedRoot = root;
  }

  nextStep(): void {
    if (this.selectedRoot) {
      this.composerService.setRoot(this.selectedRoot);
      this.stepCompleted.emit();
    }
  }

  previousStep(): void {
    this.stepCompleted.emit();
  }
}