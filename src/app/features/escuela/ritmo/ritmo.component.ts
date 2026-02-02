import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';

interface RhythmPattern {
  id: string;
  name: string;
  description: string;
  beats: { symbol: string; duration: number }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

@Component({
  selector: 'app-ritmo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ritmo.component.html',
  styleUrls: ['./ritmo.component.scss']
})
export class RitmoComponent implements OnDestroy {
  selectedPattern: RhythmPattern | null = null;
  isPlaying: boolean = false;
  currentBeat: number = -1;
  private intervalId: any = null;
  tempo: number = 100;

  patterns: RhythmPattern[] = [
    {
      id: 'basic',
      name: 'Ritmo Básico',
      description: 'Cuatro negras',
      beats: [
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 }
      ],
      difficulty: 'easy'
    },
    {
      id: 'mixed',
      name: 'Ritmo Mixto',
      description: 'Combinación de negras y corcheas',
      beats: [
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 }
      ],
      difficulty: 'medium'
    },
    {
      id: 'syncopated',
      name: 'Síncopa',
      description: 'Ritmo sincopado',
      beats: [
        { symbol: '♪', duration: 0.5 },
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 }
      ],
      difficulty: 'hard'
    },
    {
      id: 'waltz',
      name: 'Vals',
      description: 'Patrón de vals 3/4',
      beats: [
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 },
        { symbol: '♩', duration: 1 }
      ],
      difficulty: 'easy'
    },
    {
      id: 'rock',
      name: 'Rock',
      description: 'Patrón de rock básico',
      beats: [
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 }
      ],
      difficulty: 'medium'
    },
    {
      id: 'complex',
      name: 'Complejo',
      description: 'Ritmo avanzado',
      beats: [
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '𝅘𝅥𝅯', duration: 0.25 },
        { symbol: '𝅘𝅥𝅯', duration: 0.25 },
        { symbol: '♩', duration: 1 },
        { symbol: '♪', duration: 0.5 },
        { symbol: '♪', duration: 0.5 }
      ],
      difficulty: 'hard'
    }
  ];

  constructor(private audio: AudioService) {}

  ngOnDestroy(): void {
    this.stop();
  }

  selectPattern(pattern: RhythmPattern): void {
    this.stop();
    this.selectedPattern = pattern;
  }

  play(): void {
    if (!this.selectedPattern || this.isPlaying) return;

    this.audio.resume();
    this.isPlaying = true;
    this.currentBeat = 0;

    const beatDuration = (60 / this.tempo) * 1000; // ms per quarter note
    let totalTime = 0;

    this.selectedPattern.beats.forEach((beat, index) => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.currentBeat = index;
          this.audio.playMetronome(index, this.selectedPattern!.beats.length);
        }
      }, totalTime);

      totalTime += beat.duration * beatDuration;
    });

    // Loop the pattern
    this.intervalId = setTimeout(() => {
      if (this.isPlaying) {
        this.play();
      }
    }, totalTime);
  }

  stop(): void {
    this.isPlaying = false;
    this.currentBeat = -1;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  changeTempo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tempo = parseInt(input.value, 10);
    if (this.isPlaying) {
      this.stop();
      setTimeout(() => this.play(), 100);
    }
  }

  getDifficultyColor(difficulty: string): string {
    const colors = {
      'easy': '#27ae60',
      'medium': '#f39c12',
      'hard': '#e74c3c'
    };
    return colors[difficulty as keyof typeof colors] || '#7f8c8d';
  }

  getDifficultyLabel(difficulty: string): string {
    const labels = {
      'easy': 'Fácil',
      'medium': 'Medio',
      'hard': 'Difícil'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  }
}
