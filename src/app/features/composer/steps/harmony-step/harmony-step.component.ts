import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService, HarmonyType } from '../../services/composer.service';

@Component({
  selector: 'app-harmony-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harmony-step.component.html',
  styleUrls: ['./harmony-step.component.scss']
})
export class HarmonyStepComponent {
  @Output() stepCompleted = new EventEmitter<void>();

  harmonyTypes: { value: HarmonyType; label: string; emoji: string; description: string }[] = [
    {
      value: 'major',
      label: 'Mayor',
      emoji: '☀️',
      description: 'Progresiones brillantes y alegres, ideales para temas positivos'
    },
    {
      value: 'minor',
      label: 'Menor',
      emoji: '🌙',
      description: 'Progresiones emotivas y profundas, perfectas para baladas'
    },
    {
      value: 'mixed',
      label: 'Mixta',
      emoji: '🎭',
      description: 'Combinación de ambas, para crear contrastes dinámicos'
    }
  ];

  selectedHarmonyType: HarmonyType | null = null;

  constructor(private composerService: ComposerService) {}

  selectHarmonyType(harmonyType: HarmonyType): void {
    this.selectedHarmonyType = harmonyType;
  }

  nextStep(): void {
    if (this.selectedHarmonyType) {
      this.composerService.setHarmonyType(this.selectedHarmonyType);
      this.composerService.generateProgressions();
      this.stepCompleted.emit();
    }
  }

  previousStep(): void {
    this.stepCompleted.emit();
  }
}