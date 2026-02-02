import { Injectable } from '@angular/core';

export interface NoteFrequencies {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext: AudioContext | null = null;
  private oscillators: Map<string, OscillatorNode> = new Map();

  // Frequencies for musical notes (C4 to B5)
  private frequencies: NoteFrequencies = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25,
    'D5': 587.33,
    'E5': 659.25,
    'F5': 698.46,
    'G5': 783.99,
    'A5': 880.00,
    'B5': 987.77
  };

  constructor() {
    if (typeof window !== 'undefined' && typeof AudioContext !== 'undefined') {
      this.audioContext = new AudioContext();
    }
  }

  /**
   * Play a note with given frequency
   */
  playNote(note: string, duration: number = 0.5): void {
    if (!this.audioContext) return;

    const frequency = this.frequencies[note];
    if (!frequency) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Envelope for smooth attack and release
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  /**
   * Play a rhythm pattern with specified durations
   */
  playRhythm(durations: number[], tempo: number = 120): void {
    if (!this.audioContext) return;

    const beatDuration = 60 / tempo; // Duration of one beat in seconds
    let currentTime = this.audioContext.currentTime;

    durations.forEach((duration) => {
      this.playClickAt(currentTime, duration * beatDuration);
      currentTime += duration * beatDuration;
    });
  }

  /**
   * Play a click sound (for rhythm)
   */
  private playClickAt(time: number, duration: number = 0.05): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.3, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);

    oscillator.start(time);
    oscillator.stop(time + duration);
  }

  /**
   * Play a metronome click
   */
  playMetronome(beat: number, totalBeats: number): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // First beat is higher pitched
    oscillator.frequency.value = beat === 0 ? 1000 : 800;
    oscillator.type = 'square';

    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  /**
   * Resume audio context (required for user interaction)
   */
  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
