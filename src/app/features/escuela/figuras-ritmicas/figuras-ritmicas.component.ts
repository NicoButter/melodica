import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';

interface RhythmFigure {
  id: string;
  name: string;
  duration: number; // in beats
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-figuras-ritmicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './figuras-ritmicas.component.html',
  styleUrls: ['./figuras-ritmicas.component.scss']
})
export class FigurasRitmicasComponent {
  activeFigure: string | null = null;
  pulseAnimation: boolean = false;
  readonly Math = Math;

  figures: RhythmFigure[] = [
    {
      id: 'whole',
      name: 'Redonda',
      duration: 4,
      symbol: '𝅝',
      description: '4 tiempos'
    },
    {
      id: 'half',
      name: 'Blanca',
      duration: 2,
      symbol: '𝅗𝅥',
      description: '2 tiempos'
    },
    {
      id: 'quarter',
      name: 'Negra',
      duration: 1,
      symbol: '♩',
      description: '1 tiempo'
    },
    {
      id: 'eighth',
      name: 'Corchea',
      duration: 0.5,
      symbol: '♪',
      description: '½ tiempo'
    },
    {
      id: 'sixteenth',
      name: 'Semicorchea',
      duration: 0.25,
      symbol: '𝅘𝅥𝅯',
      description: '¼ tiempo'
    }
  ];

  constructor(private audio: AudioService) {}

  playFigure(figure: RhythmFigure): void {
    this.audio.resume();
    this.activeFigure = figure.id;
    this.pulseAnimation = true;

    // Play rhythm pattern based on duration
    const pattern = Array(Math.ceil(figure.duration * 4)).fill(figure.duration / 4);
    this.audio.playRhythm(pattern, 120);

    // Reset after animation
    setTimeout(() => {
      this.activeFigure = null;
      this.pulseAnimation = false;
    }, figure.duration * 500);
  }

  getScale(duration: number): number {
    // Map duration to visual scale (bigger = longer duration)
    return 0.7 + (duration / 4) * 0.6;
  }
}
