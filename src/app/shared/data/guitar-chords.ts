/**
 * Guitar Chord Database
 * Stores positions for basic guitar chords
 * 6 strings: E A D G B e (standard tuning)
 * Position values:
 *   -1 = muted string (X)
 *   0 = open string (O)
 *   1-12 = fret position
 */

export interface GuitarChord {
  name: string;
  positions: number[]; // 6 strings (E A D G B e)
  barre?: number; // Optional: fret where barre is applied
  fingering?: string[]; // Optional: finger suggestions (1=index, 2=middle, 3=ring, 4=pinky)
}

export const GUITAR_CHORDS: Record<string, GuitarChord> = {
  // Major Chords
  C: {
    name: 'C',
    positions: [-1, 3, 2, 0, 1, 0],
  },
  D: {
    name: 'D',
    positions: [-1, -1, 0, 2, 3, 2],
  },
  E: {
    name: 'E',
    positions: [0, 2, 2, 1, 0, 0],
  },
  F: {
    name: 'F',
    positions: [1, 3, 3, 2, 1, 1],
    barre: 1,
  },
  G: {
    name: 'G',
    positions: [3, 2, 0, 0, 0, 3],
  },
  A: {
    name: 'A',
    positions: [0, 0, 2, 2, 2, 0],
  },
  B: {
    name: 'B',
    positions: [-1, 2, 4, 4, 3, 2],
    barre: 2,
  },

  // Flat Chords (bemoles)
  'Bb': {
    name: 'Bb',
    positions: [-1, 1, 3, 3, 2, 1],
    barre: 1,
  },
  'Bbm': {
    name: 'Bbm',
    positions: [-1, 1, 3, 3, 1, 1],
    barre: 1,
  },
  'Eb': {
    name: 'Eb',
    positions: [-1, 6, 8, 8, 7, 6],
    barre: 6,
  },
  'Ebm': {
    name: 'Ebm',
    positions: [-1, 6, 8, 8, 6, 6],
    barre: 6,
  },
  'Ab': {
    name: 'Ab',
    positions: [4, 6, 6, 5, 4, 4],
    barre: 4,
  },
  'Abm': {
    name: 'Abm',
    positions: [4, 6, 6, 4, 4, 4],
    barre: 4,
  },
  'Db': {
    name: 'Db',
    positions: [-1, 4, 6, 6, 5, 4],
    barre: 4,
  },
  'Dbm': {
    name: 'Dbm',
    positions: [-1, 4, 6, 6, 4, 4],
    barre: 4,
  },
  'Gb': {
    name: 'Gb',
    positions: [2, 4, 4, 3, 2, 2],
    barre: 2,
  },
  'Gbm': {
    name: 'Gbm',
    positions: [2, 4, 4, 4, 2, 2],
    barre: 2,
  },

  // Sharp Chords (sostenidos)
  'F#': {
    name: 'F#',
    positions: [2, 4, 4, 3, 2, 2],
    barre: 2,
  },
  'F#m': {
    name: 'F#m',
    positions: [2, 4, 4, 4, 2, 2],
    barre: 2,
  },
  'C#': {
    name: 'C#',
    positions: [4, 6, 6, 5, 6, 4],
    barre: 4,
  },
  'C#m': {
    name: 'C#m',
    positions: [-1, 4, 6, 6, 5, 4],
    barre: 4,
  },
  'G#': {
    name: 'G#',
    positions: [4, 6, 6, 5, 6, 4],
    barre: 4,
  },
  'G#m': {
    name: 'G#m',
    positions: [4, 6, 6, 4, 4, 4],
    barre: 4,
  },
  'D#': {
    name: 'D#',
    positions: [-1, 6, 8, 8, 7, 6],
    barre: 6,
  },
  'D#m': {
    name: 'D#m',
    positions: [-1, 6, 8, 8, 6, 6],
    barre: 6,
  },
  'A#': {
    name: 'A#',
    positions: [-1, 1, 3, 3, 2, 1],
    barre: 1,
  },
  'A#m': {
    name: 'A#m',
    positions: [-1, 1, 3, 3, 1, 1],
    barre: 1,
  },
  Am: {
    name: 'Am',
    positions: [0, 0, 2, 2, 1, 0],
  },
  Cm: {
    name: 'Cm',
    positions: [3, 3, 5, 5, 3, 3],
    barre: 3,
  },
  Dm: {
    name: 'Dm',
    positions: [-1, -1, 0, 2, 3, 1],
  },
  Em: {
    name: 'Em',
    positions: [0, 2, 2, 0, 0, 0],
  },
  Fm: {
    name: 'Fm',
    positions: [1, 3, 3, 1, 1, 1],
    barre: 1,
  },
  Gm: {
    name: 'Gm',
    positions: [3, 5, 5, 3, 3, 3],
    barre: 3,
  },
  Bm: {
    name: 'Bm',
    positions: [2, 2, 4, 4, 2, 2],
    barre: 2,
  },

  // Seventh Chords
  C7: {
    name: 'C7',
    positions: [-1, 3, 2, 3, 1, 0],
  },
  D7: {
    name: 'D7',
    positions: [-1, -1, 0, 2, 1, 2],
  },
  E7: {
    name: 'E7',
    positions: [0, 2, 2, 1, 3, 0],
  },
  F7: {
    name: 'F7',
    positions: [1, 3, 1, 2, 1, 1],
    barre: 1,
  },
  G7: {
    name: 'G7',
    positions: [3, 2, 0, 0, 0, 1],
  },
  A7: {
    name: 'A7',
    positions: [0, 0, 2, 0, 2, 0],
  },
  B7: {
    name: 'B7',
    positions: [-1, 2, 4, 4, 4, 2],
  },

  // Minor Seventh
  Am7: {
    name: 'Am7',
    positions: [0, 0, 2, 0, 1, 0],
  },
  Bm7: {
    name: 'Bm7',
    positions: [2, 3, 4, 4, 2, 2],
    barre: 2,
  },
  Cm7: {
    name: 'Cm7',
    positions: [3, 3, 5, 5, 3, 3],
    barre: 3,
  },
  Dm7: {
    name: 'Dm7',
    positions: [-1, -1, 0, 2, 1, 1],
  },
  Em7: {
    name: 'Em7',
    positions: [0, 2, 2, 0, 3, 0],
  },
  Fm7: {
    name: 'Fm7',
    positions: [1, 3, 3, 1, 1, 1],
    barre: 1,
  },
  Gm7: {
    name: 'Gm7',
    positions: [3, 5, 5, 3, 3, 3],
    barre: 3,
  },

  // Major Seventh
  Cmaj7: {
    name: 'Cmaj7',
    positions: [-1, 3, 2, 0, 0, 0],
  },
  Dmaj7: {
    name: 'Dmaj7',
    positions: [-1, -1, 0, 2, 2, 2],
  },
  Emaj7: {
    name: 'Emaj7',
    positions: [0, 2, 1, 1, 0, 0],
  },
  Gmaj7: {
    name: 'Gmaj7',
    positions: [3, 2, 0, 0, 0, 2],
  },
  Amaj7: {
    name: 'Amaj7',
    positions: [0, 0, 2, 1, 2, 0],
  },
};

/**
 * Get chord data by name
 * Returns the chord or a placeholder if not found
 */
export function getChordData(chordName: string): GuitarChord {
  const normalized = chordName.trim();
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
  return Object.keys(GUITAR_CHORDS);
}
