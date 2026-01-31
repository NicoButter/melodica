import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService, MoodType } from '../../services/composer.service';

@Component({
  selector: 'app-mood-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-step.component.html',
  styleUrls: ['./mood-step.component.scss']
})
export class MoodStepComponent {
  @Output() stepCompleted = new EventEmitter<void>();

  moods: { value: MoodType; label: string; emoji: string; description: string }[] = [
    {
      value: 'arabic',
      label: 'Árabe',
      emoji: '🌅',
      description: 'Misterioso y exótico, con escalas orientales'
    },
    {
      value: 'romantic',
      label: 'Romántico',
      emoji: '💕',
      description: 'Suave y emotivo, perfecto para baladas'
    },
    {
      value: 'sad',
      label: 'Triste',
      emoji: '😢',
      description: 'Melancólico y reflexivo, para momentos introspectivos'
    },
    {
      value: 'happy',
      label: 'Feliz',
      emoji: '😊',
      description: 'Alegre y optimista, ideal para canciones upbeat'
    }
  ];

  selectedMood: MoodType | null = null;

  constructor(private composerService: ComposerService) {}

  selectMood(mood: MoodType): void {
    this.selectedMood = mood;
  }

  nextStep(): void {
    if (this.selectedMood) {
      this.composerService.setMood(this.selectedMood);
      this.stepCompleted.emit();
    }
  }
}