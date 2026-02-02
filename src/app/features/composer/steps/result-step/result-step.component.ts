import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService, ProgressionResult } from '../../services/composer.service';
import { GuitarChordComponent } from '../../../../shared/components/guitar-chord/guitar-chord.component';

@Component({
  selector: 'app-result-step',
  standalone: true,
  imports: [CommonModule, GuitarChordComponent],
  templateUrl: './result-step.component.html',
  styleUrls: ['./result-step.component.scss']
})
export class ResultStepComponent implements OnInit {
  @Output() stepCompleted = new EventEmitter<void>();

  progressions: ProgressionResult | null = null;
  mood: string = '';
  root: string = '';
  harmonyType: string = '';

  constructor(private composerService: ComposerService) {}

  ngOnInit(): void {
    const state = this.composerService.getState();
    this.progressions = state.progressions;
    this.mood = state.mood || '';
    this.root = state.root || '';
    this.harmonyType = state.harmonyType || '';
  }

  getMoodEmoji(mood: string): string {
    const emojis: Record<string, string> = {
      arabic: '🌅',
      romantic: '💕',
      sad: '😢',
      happy: '😊'
    };
    return emojis[mood] || '🎼';
  }

  getMoodLabel(mood: string): string {
    const labels: Record<string, string> = {
      arabic: 'Árabe',
      romantic: 'Romántico',
      sad: 'Triste',
      happy: 'Feliz'
    };
    return labels[mood] || mood;
  }

  getHarmonyLabel(harmonyType: string): string {
    const labels: Record<string, string> = {
      major: 'Mayor',
      minor: 'Menor',
      mixed: 'Mixta'
    };
    return labels[harmonyType] || harmonyType;
  }

  formatProgression(progression: string[]): string {
    return progression.join(' - ');
  }

  startOver(): void {
    this.composerService.reset();
    this.stepCompleted.emit();
  }

  previousStep(): void {
    this.stepCompleted.emit();
  }

  copyProgression(progression: string[]): void {
    const progressionText = progression.join(' - ');
    navigator.clipboard.writeText(progressionText).then(() => {
      // Podríamos mostrar un toast de éxito aquí
      console.log('Progresión copiada:', progressionText);
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }
}