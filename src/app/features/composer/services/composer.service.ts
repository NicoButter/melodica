import { Injectable } from '@angular/core';

// Tipos para el estado del composer
export interface ComposerState {
  mood: MoodType | null;
  root: RootNote | null;
  harmonyType: HarmonyType | null;
  progressions: ProgressionResult | null;
}

export type MoodType = 'arabic' | 'romantic' | 'sad' | 'happy';
export type RootNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'Bb' | 'Eb' | 'F#';
export type HarmonyType = 'major' | 'minor' | 'mixed';

export interface ProgressionResult {
  major: string[][];
  minor: string[][];
}

// Mapeo de acordes por nota raíz
const CHORD_MAP: Record<RootNote, { major: string[]; minor: string[] }> = {
  'C': { major: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'], minor: ['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'] },
  'D': { major: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'], minor: ['Dm', 'Edim', 'F', 'Gm', 'Am', 'Bb', 'C'] },
  'E': { major: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'], minor: ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'] },
  'F': { major: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'], minor: ['Fm', 'Gdim', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'] },
  'G': { major: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'], minor: ['Gm', 'Adim', 'Bb', 'Cm', 'Dm', 'Eb', 'F'] },
  'A': { major: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'], minor: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'] },
  'B': { major: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'], minor: ['Bm', 'C#dim', 'D', 'Em', 'F#m', 'G', 'A'] },
  'Bb': { major: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'], minor: ['Bbm', 'Cdim', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'] },
  'Eb': { major: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'], minor: ['Ebm', 'Fdim', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'] },
  'F#': { major: ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'], minor: ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E'] }
};

// Progresiones predefinidas por mood
const PROGRESSIONS_BY_MOOD: Record<MoodType, { major: number[][]; minor: number[][] }> = {
  arabic: {
    major: [
      [0, 4, 3, 4], // I - V - IV - V
      [0, 5, 3, 4], // I - VI - IV - V
      [0, 2, 3, 4], // I - III - IV - V
      [0, 5, 0, 3], // I - VI - I - IV
      [0, 4, 0, 5]  // I - V - I - VI
    ],
    minor: [
      [0, 3, 4, 0], // i - iv - v - i
      [0, 5, 3, 4], // i - VI - iv - v
      [0, 2, 3, 0], // i - III - iv - i
      [0, 4, 0, 3], // i - v - i - iv
      [0, 5, 0, 4]  // i - VI - i - v
    ]
  },
  romantic: {
    major: [
      [0, 3, 4, 0], // I - IV - V - I
      [0, 5, 1, 4], // I - VI - II - V
      [0, 1, 4, 0], // I - II - V - I
      [0, 4, 3, 0], // I - V - IV - I
      [0, 2, 5, 0]  // I - III - VI - I
    ],
    minor: [
      [0, 3, 4, 0], // i - iv - v - i
      [0, 5, 1, 4], // i - VI - II - v
      [0, 1, 4, 0], // i - II - v - i
      [0, 4, 3, 0], // i - v - iv - i
      [0, 2, 5, 0]  // i - III - VI - i
    ]
  },
  sad: {
    major: [
      [0, 5, 3, 4], // I - VI - IV - V
      [0, 2, 5, 0], // I - III - VI - I
      [0, 4, 2, 0], // I - V - III - I
      [0, 3, 2, 0], // I - IV - III - I
      [0, 5, 4, 0]  // I - VI - V - I
    ],
    minor: [
      [0, 5, 3, 4], // i - VI - iv - v
      [0, 2, 5, 0], // i - III - VI - i
      [0, 4, 2, 0], // i - v - III - i
      [0, 3, 2, 0], // i - iv - III - i
      [0, 5, 4, 0]  // i - VI - v - i
    ]
  },
  happy: {
    major: [
      [0, 4, 0, 4], // I - V - I - V
      [0, 4, 3, 0], // I - V - IV - I
      [0, 3, 4, 0], // I - IV - V - I
      [0, 4, 5, 0], // I - V - VI - I
      [0, 1, 0, 4]  // I - II - I - V
    ],
    minor: [
      [0, 4, 0, 4], // i - v - i - v
      [0, 4, 3, 0], // i - v - iv - i
      [0, 3, 4, 0], // i - iv - v - i
      [0, 4, 5, 0], // i - v - VI - i
      [0, 1, 0, 4]  // i - II - i - v
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class ComposerService {
  private state: ComposerState = {
    mood: null,
    root: null,
    harmonyType: null,
    progressions: null
  };

  // Getters para el estado
  getState(): ComposerState {
    return { ...this.state };
  }

  getCurrentStep(): number {
    if (!this.state.mood) return 1;
    if (!this.state.root) return 2;
    if (!this.state.harmonyType) return 3;
    if (!this.state.progressions) return 4;
    return 5; // Completado
  }

  // Setters para actualizar el estado
  setMood(mood: MoodType): void {
    this.state.mood = mood;
    this.resetProgressions();
  }

  setRoot(root: RootNote): void {
    this.state.root = root;
    this.resetProgressions();
  }

  setHarmonyType(harmonyType: HarmonyType): void {
    this.state.harmonyType = harmonyType;
    this.resetProgressions();
  }

  // Generar progresiones basado en las selecciones
  generateProgressions(): void {
    if (!this.state.mood || !this.state.root || !this.state.harmonyType) {
      return;
    }

    const moodProgressions = PROGRESSIONS_BY_MOOD[this.state.mood];
    const chords = CHORD_MAP[this.state.root];

    // Generar progresiones mayores
    const majorProgressions = moodProgressions.major.map(progression =>
      progression.map(chordIndex => chords.major[chordIndex])
    );

    // Generar progresiones menores
    const minorProgressions = moodProgressions.minor.map(progression =>
      progression.map(chordIndex => chords.minor[chordIndex])
    );

    this.state.progressions = {
      major: majorProgressions,
      minor: minorProgressions
    };
  }

  // Reset progresiones cuando cambian las selecciones
  private resetProgressions(): void {
    this.state.progressions = null;
  }

  // Reset completo del estado
  reset(): void {
    this.state = {
      mood: null,
      root: null,
      harmonyType: null,
      progressions: null
    };
  }

  // Métodos de utilidad
  getAvailableMoods(): MoodType[] {
    return ['arabic', 'romantic', 'sad', 'happy'];
  }

  getAvailableRoots(): RootNote[] {
    return ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Bb', 'Eb', 'F#'];
  }

  getAvailableHarmonyTypes(): HarmonyType[] {
    return ['major', 'minor', 'mixed'];
  }
}