import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';

interface TimeSignature {
  id: string;
  numerator: number;
  denominator: number;
  name: string;
  description: string;
}

interface Beat {
  note: string;
  duration: number; // in beats
}

interface Measure {
  beats: Beat[];
}

@Component({
  selector: 'app-compas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compas.component.html',
  styleUrls: ['./compas.component.scss']
})
export class CompasComponent implements OnDestroy {
  selectedSignature: TimeSignature | null = null;
  isPlaying: boolean = false;
  currentBeat: number = 0;
  currentMeasure: number = 0;
  private intervalId: any = null;
  readonly Math = Math;

  timeSignatures: TimeSignature[] = [
    {
      id: '4/4',
      numerator: 4,
      denominator: 4,
      name: '4/4 (Compasillo)',
      description: '4 negras por compás - El más común'
    },
    {
      id: '3/4',
      numerator: 3,
      denominator: 4,
      name: '3/4 (Vals)',
      description: '3 negras por compás - Ritmo de vals'
    },
    {
      id: '6/8',
      numerator: 6,
      denominator: 8,
      name: '6/8',
      description: '6 corcheas por compás - Sentimiento de 2'
    },
    {
      id: '2/4',
      numerator: 2,
      denominator: 4,
      name: '2/4 (Marcha)',
      description: '2 negras por compás - Ritmo de marcha'
    }
  ];

  // Example measures for each time signature
  exampleMeasures: { [key: string]: Measure[] } = {
    '4/4': [
      { beats: [{ note: '♩', duration: 1 }, { note: '♩', duration: 1 }, { note: '♩', duration: 1 }, { note: '♩', duration: 1 }] },
      { beats: [{ note: '♩', duration: 1 }, { note: '♩', duration: 1 }, { note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♩', duration: 1 }] }
    ],
    '3/4': [
      { beats: [{ note: '♩', duration: 1 }, { note: '♩', duration: 1 }, { note: '♩', duration: 1 }] },
      { beats: [{ note: '𝅗𝅥', duration: 2 }, { note: '♩', duration: 1 }] }
    ],
    '6/8': [
      { beats: [{ note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }] },
      { beats: [{ note: '♩', duration: 1 }, { note: '♪', duration: 0.5 }, { note: '♩', duration: 1 }, { note: '♪', duration: 0.5 }] }
    ],
    '2/4': [
      { beats: [{ note: '♩', duration: 1 }, { note: '♩', duration: 1 }] },
      { beats: [{ note: '♪', duration: 0.5 }, { note: '♪', duration: 0.5 }, { note: '♩', duration: 1 }] }
    ]
  };

  constructor(private audio: AudioService) {}

  ngOnDestroy(): void {
    this.stop();
  }

  selectSignature(signature: TimeSignature): void {
    this.stop();
    this.selectedSignature = signature;
  }

  play(): void {
    if (!this.selectedSignature) return;

    this.audio.resume();
    this.isPlaying = true;
    this.currentBeat = 0;
    this.currentMeasure = 0;

    const beatsPerMeasure = this.selectedSignature.numerator;
    const tempo = 120; // BPM
    const beatDuration = (60 / tempo) * 1000; // in milliseconds

    this.intervalId = setInterval(() => {
      this.audio.playMetronome(this.currentBeat, beatsPerMeasure);
      
      this.currentBeat++;
      
      if (this.currentBeat >= beatsPerMeasure) {
        this.currentBeat = 0;
        this.currentMeasure++;
        
        const measures = this.exampleMeasures[this.selectedSignature!.id];
        if (this.currentMeasure >= measures.length) {
          this.currentMeasure = 0;
        }
      }
    }, beatDuration);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentBeat = 0;
    this.currentMeasure = 0;
  }

  getCurrentMeasures(): Measure[] {
    if (!this.selectedSignature) return [];
    return this.exampleMeasures[this.selectedSignature.id] || [];
  }

  isBeatActive(measureIndex: number, beatIndex: number): boolean {
    if (!this.isPlaying) return false;
    return measureIndex === this.currentMeasure && beatIndex === this.currentBeat;
  }
}
