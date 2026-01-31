import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService, RootNote } from '../../services/composer.service';

@Component({
  selector: 'app-root-step',
  standalone: true,
  imports: [CommonModule],
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