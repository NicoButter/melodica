/**
 * Guitar Chord Database - ENRIQUECIDA
 * 6 strings: E A D G B e (standard tuning)
 * -1 = muted (X), 0 = open (O), 1+ = fret
 */

export interface GuitarChord {
  name: string;
  positions: number[];           // [E, A, D, G, B, e]
  barre?: number;                // traste de la cejilla (opcional)
  fingering?: string[];          // '1','2','3','4','O','X' por cuerda
}

export const GUITAR_CHORDS: Record<string, GuitarChord> = {
  // ==================== ACORDES MAYORES ====================
  C:      { name: 'C',      positions: [-1, 3, 2, 0, 1, 0], fingering: ['X','3','2','O','1','O'] },
  D:      { name: 'D',      positions: [-1,-1, 0, 2, 3, 2], fingering: ['X','X','O','1','3','2'] },
  E:      { name: 'E',      positions: [ 0, 2, 2, 1, 0, 0], fingering: ['O','2','3','1','O','O'] },
  F:      { name: 'F',      positions: [ 1, 3, 3, 2, 1, 1], barre: 1, fingering: ['1','3','4','2','1','1'] },
  G:      { name: 'G',      positions: [ 3, 2, 0, 0, 0, 3], fingering: ['3','2','O','O','O','4'] },
  A:      { name: 'A',      positions: [ 0, 0, 2, 2, 2, 0], fingering: ['O','O','1','2','3','O'] },
  B:      { name: 'B',      positions: [-1, 2, 4, 4, 4, 2], barre: 2, fingering: ['X','1','3','4','4','1'] },

  // ==================== ACORDES MENORES ====================
  Am:     { name: 'Am',     positions: [ 0, 0, 2, 2, 1, 0], fingering: ['O','O','2','3','1','O'] },
  Bm:     { name: 'Bm',     positions: [-1, 2, 4, 4, 3, 2], barre: 2, fingering: ['X','1','3','4','2','1'] },
  Cm:     { name: 'Cm',     positions: [-1, 3, 5, 5, 4, 3], barre: 3, fingering: ['X','1','3','4','2','1'] },
  Dm:     { name: 'Dm',     positions: [-1,-1, 0, 2, 3, 1], fingering: ['X','X','O','2','3','1'] },
  Em:     { name: 'Em',     positions: [ 0, 2, 2, 0, 0, 0], fingering: ['O','2','3','O','O','O'] },
  Fm:     { name: 'Fm',     positions: [ 1, 3, 3, 1, 1, 1], barre: 1, fingering: ['1','3','4','1','1','1'] },
  Gm:     { name: 'Gm',     positions: [ 3, 5, 5, 3, 3, 3], barre: 3, fingering: ['1','3','4','1','1','1'] },

  // ==================== BEMOLES (Flat) ====================
  'Bb':   { name: 'Bb',     positions: [-1, 1, 3, 3, 3, 1], barre: 1, fingering: ['X','1','3','4','4','1'] },
  'Bbm':  { name: 'Bbm',    positions: [-1, 1, 3, 3, 2, 1], barre: 1, fingering: ['X','1','3','4','2','1'] },
  'Eb':   { name: 'Eb',     positions: [-1, 6, 8, 8, 8, 6], barre: 6, fingering: ['X','1','3','4','4','1'] },
  'Ebm':  { name: 'Ebm',    positions: [-1, 6, 8, 8, 7, 6], barre: 6, fingering: ['X','1','3','4','2','1'] },
  'Ab':   { name: 'Ab',     positions: [ 4, 6, 6, 5, 4, 4], barre: 4, fingering: ['1','3','4','2','1','1'] },
  'Abm':  { name: 'Abm',    positions: [ 4, 6, 6, 4, 4, 4], barre: 4, fingering: ['1','3','4','1','1','1'] },
  'Db':   { name: 'Db',     positions: [-1, 4, 6, 6, 6, 4], barre: 4, fingering: ['X','1','3','4','4','1'] },
  'Dbm':  { name: 'Dbm',    positions: [-1, 4, 6, 6, 5, 4], barre: 4, fingering: ['X','1','3','4','2','1'] },
  'Gb':   { name: 'Gb',     positions: [ 2, 4, 4, 3, 2, 2], barre: 2, fingering: ['1','3','4','2','1','1'] },
  'Gbm':  { name: 'Gbm',    positions: [ 2, 4, 4, 2, 2, 2], barre: 2, fingering: ['1','3','4','1','1','1'] },

  // ==================== SOSTENIDOS (Sharp) ====================
  'F#':   { name: 'F#',     positions: [ 2, 4, 4, 3, 2, 2], barre: 2, fingering: ['1','3','4','2','1','1'] },
  'F#m':  { name: 'F#m',    positions: [ 2, 4, 4, 2, 2, 2], barre: 2, fingering: ['1','3','4','1','1','1'] },
  'C#':   { name: 'C#',     positions: [ 4, 6, 6, 5, 4, 4], barre: 4, fingering: ['1','3','4','2','1','1'] },
  'C#m':  { name: 'C#m',    positions: [-1, 4, 6, 6, 5, 4], barre: 4, fingering: ['X','1','3','4','2','1'] },
  'G#':   { name: 'G#',     positions: [ 4, 6, 6, 5, 4, 4], barre: 4, fingering: ['1','3','4','2','1','1'] },
  'G#m':  { name: 'G#m',    positions: [ 4, 6, 6, 4, 4, 4], barre: 4, fingering: ['1','3','4','1','1','1'] },
  'D#':   { name: 'D#',     positions: [-1, 6, 8, 8, 8, 6], barre: 6, fingering: ['X','1','3','4','4','1'] },
  'D#m':  { name: 'D#m',    positions: [-1, 6, 8, 8, 7, 6], barre: 6, fingering: ['X','1','3','4','2','1'] },
  'A#':   { name: 'A#',     positions: [-1, 1, 3, 3, 3, 1], barre: 1, fingering: ['X','1','3','4','4','1'] },
  'A#m':  { name: 'A#m',    positions: [-1, 1, 3, 3, 2, 1], barre: 1, fingering: ['X','1','3','4','2','1'] },

  // ==================== SÉPTIMA (7th) ====================
  C7:     { name: 'C7',     positions: [-1, 3, 2, 3, 1, 0], fingering: ['X','3','2','4','1','O'] },
  D7:     { name: 'D7',     positions: [-1,-1, 0, 2, 1, 2], fingering: ['X','X','O','2','1','3'] },
  E7:     { name: 'E7',     positions: [ 0, 2, 2, 1, 3, 0], fingering: ['O','2','3','1','4','O'] },
  F7:     { name: 'F7',     positions: [ 1, 3, 1, 2, 1, 1], barre: 1, fingering: ['1','3','1','2','1','1'] },
  G7:     { name: 'G7',     positions: [ 3, 2, 0, 0, 0, 1], fingering: ['3','2','O','O','O','1'] },
  A7:     { name: 'A7',     positions: [ 0, 0, 2, 0, 2, 0], fingering: ['O','O','2','O','3','O'] },
  B7:     { name: 'B7',     positions: [-1, 2, 1, 2, 0, 2], fingering: ['X','2','1','3','O','4'] },

  // ==================== MENOR SÉPTIMA (m7) ====================
  Am7:    { name: 'Am7',    positions: [ 0, 0, 2, 0, 1, 0], fingering: ['O','O','2','O','1','O'] },
  Bm7:    { name: 'Bm7',    positions: [-1, 2, 4, 2, 3, 2], barre: 2, fingering: ['X','1','3','1','2','1'] },
  Cm7:    { name: 'Cm7',    positions: [-1, 3, 5, 3, 4, 3], barre: 3, fingering: ['X','1','3','1','2','1'] },
  Dm7:    { name: 'Dm7',    positions: [-1,-1, 0, 2, 1, 1], fingering: ['X','X','O','2','1','1'] },
  Em7:    { name: 'Em7',    positions: [ 0, 2, 2, 0, 3, 0], fingering: ['O','2','3','O','4','O'] },
  Fm7:    { name: 'Fm7',    positions: [ 1, 3, 1, 1, 1, 1], barre: 1, fingering: ['1','3','1','1','1','1'] },
  Gm7:    { name: 'Gm7',    positions: [ 3, 5, 3, 3, 3, 3], barre: 3, fingering: ['1','3','1','1','1','1'] },

  // ==================== MAYOR SÉPTIMA (maj7) ====================
  Cmaj7:  { name: 'Cmaj7',  positions: [-1, 3, 2, 0, 0, 0], fingering: ['X','3','2','O','O','O'] },
  Dmaj7:  { name: 'Dmaj7',  positions: [-1,-1, 0, 2, 2, 2], fingering: ['X','X','O','1','2','3'] },
  Emaj7:  { name: 'Emaj7',  positions: [ 0, 2, 1, 1, 0, 0], fingering: ['O','3','1','2','O','O'] },
  Fmaj7:  { name: 'Fmaj7',  positions: [ 1, 3, 2, 2, 1, 0], barre: 1, fingering: ['1','4','2','3','1','O'] },
  Gmaj7:  { name: 'Gmaj7',  positions: [ 3, 2, 0, 0, 0, 2], fingering: ['3','2','O','O','O','1'] },
  Amaj7:  { name: 'Amaj7',  positions: [ 0, 0, 2, 1, 2, 0], fingering: ['O','O','2','1','3','O'] },

  // ==================== SUSPENDED 2 (sus2) ====================
  Csus2:  { name: 'Csus2',  positions: [-1, 3, 0, 0, 1, 3], fingering: ['X','3','O','O','1','4'] },
  Dsus2:  { name: 'Dsus2',  positions: [-1,-1, 0, 2, 3, 0], fingering: ['X','X','O','2','3','O'] },
  Esus2:  { name: 'Esus2',  positions: [ 0, 2, 2, 4, 0, 0], fingering: ['O','2','3','4','O','O'] },
  Fsus2:  { name: 'Fsus2',  positions: [ 1, 3, 3, 0, 1, 1], barre: 1, fingering: ['1','3','4','O','1','1'] },
  Gsus2:  { name: 'Gsus2',  positions: [ 3, 0, 0, 0, 3, 3], fingering: ['3','O','O','O','4','4'] },
  Asus2:  { name: 'Asus2',  positions: [ 0, 0, 2, 2, 0, 0], fingering: ['O','O','2','3','O','O'] },
  Bsus2:  { name: 'Bsus2',  positions: [-1, 2, 4, 4, 2, 2], barre: 2, fingering: ['X','1','3','4','1','1'] },

  // ==================== SUSPENDED 4 (sus4) ====================
  Csus4:  { name: 'Csus4',  positions: [-1, 3, 3, 0, 1, 1], fingering: ['X','3','4','O','1','1'] },
  Dsus4:  { name: 'Dsus4',  positions: [-1,-1, 0, 2, 3, 3], fingering: ['X','X','O','2','3','4'] },
  Esus4:  { name: 'Esus4',  positions: [ 0, 2, 2, 2, 0, 0], fingering: ['O','2','3','4','O','O'] },
  Fsus4:  { name: 'Fsus4',  positions: [ 1, 3, 3, 3, 1, 1], barre: 1, fingering: ['1','3','4','4','1','1'] },
  Gsus4:  { name: 'Gsus4',  positions: [ 3, 3, 0, 0, 1, 3], fingering: ['3','4','O','O','1','4'] },
  Asus4:  { name: 'Asus4',  positions: [ 0, 0, 2, 2, 3, 0], fingering: ['O','O','2','3','4','O'] },
  Bsus4:  { name: 'Bsus4',  positions: [-1, 2, 4, 4, 5, 2], barre: 2, fingering: ['X','1','3','4','4','1'] },

  // ==================== POWER CHORDS (5) ====================
  C5:     { name: 'C5',     positions: [-1, 3, 5, 5,-1,-1], fingering: ['X','1','3','4','X','X'] },
  D5:     { name: 'D5',     positions: [-1,-1, 0, 2, 3,-1], fingering: ['X','X','O','1','2','X'] },
  E5:     { name: 'E5',     positions: [ 0, 2, 2,-1,-1,-1], fingering: ['O','1','2','X','X','X'] },
  F5:     { name: 'F5',     positions: [ 1, 3, 3,-1,-1,-1], fingering: ['1','3','4','X','X','X'] },
  G5:     { name: 'G5',     positions: [ 3, 5, 5,-1,-1,-1], fingering: ['1','3','4','X','X','X'] },
  A5:     { name: 'A5',     positions: [-1, 0, 2, 2,-1,-1], fingering: ['X','O','1','2','X','X'] },
  B5:     { name: 'B5',     positions: [-1, 2, 4, 4,-1,-1], fingering: ['X','1','3','4','X','X'] },

  // ==================== DISMINUIDOS (dim) ====================
  Cdim:   { name: 'Cdim',   positions: [-1, 3, 4, 2, 4,-1], fingering: ['X','2','3','1','4','X'] },
  Cdim7:  { name: 'Cdim7',  positions: [-1,-1, 1, 2, 1, 2], fingering: ['X','X','1','3','2','4'] },
  Ddim:   { name: 'Ddim',   positions: [-1,-1, 0, 1, 0, 1], fingering: ['X','X','O','1','O','2'] },
  Edim:   { name: 'Edim',   positions: [ 0, 1, 2, 0, 2, 0], fingering: ['O','1','2','O','3','O'] },
  Fdim:   { name: 'Fdim',   positions: [ 1, 2, 3, 1, 3, 1], barre: 1, fingering: ['1','2','3','1','4','1'] },
  Gdim:   { name: 'Gdim',   positions: [ 3, 4, 5, 3, 5, 3], barre: 3, fingering: ['1','2','3','1','4','1'] },
  Adim:   { name: 'Adim',   positions: [-1, 0, 1, 2, 1,-1], fingering: ['X','O','1','3','2','X'] },
  Bdim:   { name: 'Bdim',   positions: [-1, 2, 3, 4, 3,-1], fingering: ['X','1','2','4','3','X'] },

  // ==================== AUMENTADOS (aug) ====================
  Caug:   { name: 'Caug',   positions: [-1, 3, 2, 1, 1, 0], fingering: ['X','4','3','1','2','O'] },
  Daug:   { name: 'Daug',   positions: [-1,-1, 0, 3, 3, 2], fingering: ['X','X','O','3','4','2'] },
  Eaug:   { name: 'Eaug',   positions: [ 0, 3, 2, 1, 1, 0], fingering: ['O','4','3','1','2','O'] },
  Faug:   { name: 'Faug',   positions: [ 1, 4, 3, 2, 2, 1], barre: 1, fingering: ['1','4','3','2','2','1'] },
  Gaug:   { name: 'Gaug',   positions: [ 3, 2, 1, 0, 0, 3], fingering: ['3','2','1','O','O','4'] },
  Aaug:   { name: 'Aaug',   positions: [-1, 0, 3, 2, 2, 1], fingering: ['X','O','4','2','3','1'] },

  // ==================== SEXTA (6) ====================
  C6:     { name: 'C6',     positions: [-1, 3, 2, 2, 1, 0], fingering: ['X','3','2','4','1','O'] },
  D6:     { name: 'D6',     positions: [-1,-1, 0, 2, 0, 2], fingering: ['X','X','O','2','O','3'] },
  E6:     { name: 'E6',     positions: [ 0, 2, 2, 1, 2, 0], fingering: ['O','2','3','1','4','O'] },
  G6:     { name: 'G6',     positions: [ 3, 2, 0, 0, 0, 0], fingering: ['3','2','O','O','O','O'] },
  A6:     { name: 'A6',     positions: [ 0, 0, 2, 2, 2, 2], fingering: ['O','O','1','2','3','4'] },

  // ==================== NOVENA (9, add9) ====================
  Cadd9:  { name: 'Cadd9',  positions: [-1, 3, 2, 0, 3, 0], fingering: ['X','3','2','O','4','O'] },
  Dadd9:  { name: 'Dadd9',  positions: [-1,-1, 0, 2, 3, 0], fingering: ['X','X','O','2','3','O'] },
  Eadd9:  { name: 'Eadd9',  positions: [ 0, 2, 2, 1, 0, 2], fingering: ['O','2','3','1','O','4'] },
  Gadd9:  { name: 'Gadd9',  positions: [ 3, 0, 0, 0, 0, 3], fingering: ['2','O','O','O','O','3'] },
  Aadd9:  { name: 'Aadd9',  positions: [ 0, 0, 2, 2, 0, 0], fingering: ['O','O','1','2','O','O'] },
  C9:     { name: 'C9',     positions: [-1, 3, 2, 3, 3, 0], fingering: ['X','3','2','4','4','O'] },
  Am9:    { name: 'Am9',    positions: [ 0, 0, 1, 1, 1, 0], fingering: ['O','O','1','2','3','O'] },

  // ==================== OTROS ÚTILES ====================
  'C7sus4': { name: 'C7sus4', positions: [-1, 3, 3, 3, 1, 1], barre: 1, fingering: ['X','2','3','4','1','1'] },
  'Dm7b5':  { name: 'Dm7b5',  positions: [-1,-1, 0, 1, 1, 1], fingering: ['X','X','O','1','2','3'] },
  'Fmaj9':  { name: 'Fmaj9',  positions: [ 1, 3, 2, 0, 1, 0], fingering: ['1','3','2','O','1','O'] },
  'Em7b5':  { name: 'Em7b5',  positions: [ 0, 1, 2, 0, 2, 0], fingering: ['O','1','2','O','3','O'] },
};

/**
 * Get chord data by name
 * Returns the chord or a placeholder if not found
 */
export function getChordData(chordName: string): GuitarChord {
  const normalized = chordName.trim().replace(/♭/g, 'b').replace(/♯/g, '#');
  return (
    GUITAR_CHORDS[normalized] || {
      name: normalized,
      positions: [0, 0, 0, 0, 0, 0], // Default open strings
    }
  );
}

/**
 * List all available chord names
 */
export function getAvailableChords(): string[] {
  return Object.keys(GUITAR_CHORDS).sort();
}
