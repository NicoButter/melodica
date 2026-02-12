import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('pentagramaSection') pentagramaSection: ElementRef | undefined;
  
  activeFigure: string | null = null;
  pulseAnimation: boolean = false;
  isPlayingPattern: boolean = false;
  noteActive: boolean[] = [];
  currentPattern: RhythmFigure | null = null;
  noteSlots: number[] = [];
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

  constructor(
    private audio: AudioService,
    private cdr: ChangeDetectorRef
  ) {}

  playFigure(figure: RhythmFigure): void {
    if (this.isPlayingPattern) {
      return;
    }

    this.audio.resume();
    this.activeFigure = figure.id;
    this.pulseAnimation = true;
    this.currentPattern = figure;

    const noteCount = Math.max(1, Math.round(4 / figure.duration));
    const noteDurationMs = figure.duration * 1000;
    this.noteSlots = Array.from({ length: noteCount }, (_, i) => i);
    this.noteActive = new Array(noteCount).fill(false);
    this.isPlayingPattern = true;
    this.cdr.detectChanges();

    // Scroll to pentagrama section
    setTimeout(() => {
      if (this.pentagramaSection) {
        this.pentagramaSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    for (let i = 0; i < noteCount; i++) {
      // Activate note
      setTimeout(() => {
        this.noteActive = [...this.noteActive];
        this.noteActive[i] = true;
        this.audio.playNote('A4', figure.duration);
        this.cdr.detectChanges();
      }, i * noteDurationMs);

      // Deactivate note
      setTimeout(() => {
        this.noteActive = [...this.noteActive];
        this.noteActive[i] = false;
        this.cdr.detectChanges();
      }, (i + 1) * noteDurationMs - 50);
    }

    const totalDurationMs = noteCount * noteDurationMs;

    setTimeout(() => {
      this.isPlayingPattern = false;
      this.noteActive = [];
      this.activeFigure = null;
      this.pulseAnimation = false;
      this.cdr.detectChanges();
    }, totalDurationMs);
  }

  getScale(duration: number): number {
    // Map duration to visual scale (bigger = longer duration)
    return 0.7 + (duration / 4) * 0.6;
  }
}
