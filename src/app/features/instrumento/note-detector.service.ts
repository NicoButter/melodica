import { Injectable } from '@angular/core';
import { ComposerService, RootNote } from '../composer/services/composer.service';

export interface NoteDetectionState {
  detectedNote: string | null;
  confidence: number;
  suggestedProgressions: string[][] | null;
  harmonyType: 'major' | 'minor' | 'mixed';
}

@Injectable({
  providedIn: 'root'
})
export class NoteDetectorService {
  private state: NoteDetectionState = {
    detectedNote: null,
    confidence: 0,
    suggestedProgressions: null,
    harmonyType: 'major'
  };

  // Mapping de notas detectadas a notas raíz (respeta sostenidos/bemoles)
  private noteToRoot: { [key: string]: RootNote } = {
    'C': 'C',
    'C#': 'C', // Keep as C for now since RootNote doesn't have C#
    'Db': 'Eb',
    'D': 'D',
    'D#': 'D', // Keep as D for now
    'Eb': 'Eb',
    'E': 'E',
    'F': 'F',
    'F#': 'F#',
    'Gb': 'F#',
    'G': 'G',
    'G#': 'G', // Keep as G for now
    'Ab': 'G',
    'A': 'A',
    'A#': 'Bb',
    'Bb': 'Bb',
    'B': 'B'
  };

  constructor(private composerService: ComposerService) {}

  /**
   * Procesa una detección de nota y genera sugerencias de progresiones
   */
  processDetection(noteWithOctave: string, confidence: number): NoteDetectionState {
    // Extraer la nota sin octava
    const noteMatch = noteWithOctave.match(/^([A-G]#?b?)(\d+)?$/);
    if (!noteMatch) {
      return this.state;
    }

    const note = noteMatch[1];
    const rootNote = this.noteToRoot[note];

    if (!rootNote) {
      return this.state;
    }

    // Actualizar estado
    this.state.detectedNote = noteWithOctave;
    this.state.confidence = Math.min(1, Math.max(0, confidence));

    // Generar progresiones sugeridas basadas en la nota detectada
    this.state.suggestedProgressions = this.generateSuggestedProgressions(rootNote, this.state.harmonyType);

    return this.state;
  }

  /**
   * Genera progresiones sugeridas para una nota raíz y tipo de armonía
   */
  private generateSuggestedProgressions(rootNote: RootNote, harmonyType: 'major' | 'minor' | 'mixed'): string[][] {
    // Usamos el ComposerService para obtener las progresiones reales
    this.composerService.setMood('happy'); // Default mood
    this.composerService.setRoot(rootNote);
    this.composerService.setHarmonyType(harmonyType);
    this.composerService.generateProgressions();

    const state = this.composerService.getState();
    if (state.progressions) {
      return harmonyType === 'major'
        ? state.progressions.major
        : harmonyType === 'minor'
        ? state.progressions.minor
        : [...state.progressions.major, ...state.progressions.minor];
    }

    return [];
  }

  /**
   * Cambia el tipo de armonía y regenera progresiones
   */
  setHarmonyType(harmonyType: 'major' | 'minor' | 'mixed'): void {
    this.state.harmonyType = harmonyType;

    if (this.state.detectedNote) {
      const noteMatch = this.state.detectedNote.match(/^([A-G]#?b?)(\d+)?$/);
      if (noteMatch) {
        const note = noteMatch[1];
        const rootNote = this.noteToRoot[note];
        if (rootNote) {
          this.state.suggestedProgressions = this.generateSuggestedProgressions(rootNote, harmonyType);
        }
      }
    }
  }

  /**
   * Obtiene el estado actual
   */
  getState(): NoteDetectionState {
    return { ...this.state };
  }

  /**
   * Reinicia el estado
   */
  reset(): void {
    this.state = {
      detectedNote: null,
      confidence: 0,
      suggestedProgressions: null,
      harmonyType: 'major'
    };
  }

  /**
   * Formatea una progresión para mostrar
   */
  formatProgression(progression: string[]): string {
    return progression.join(' → ');
  }
}
