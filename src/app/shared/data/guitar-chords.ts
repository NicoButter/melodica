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
    positions: [-1, 0, 4, 4, 4, 2],
  },

  // Minor Chords
  Am: {
    name: 'Am',
    positions: [0, 0, 2, 2, 1, 0],
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
    positions: [2, 3, 4, 4, 3, 2],
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
  G7: {
    name: 'G7',
    positions: [3, 2, 0, 0, 0, 1],
  },
  A7: {
    name: 'A7',
    positions: [0, 0, 2, 0, 2, 0],
  },

  // Minor Seventh
  Am7: {
    name: 'Am7',
    positions: [0, 0, 2, 0, 1, 0],
  },
  Dm7: {
    name: 'Dm7',
    positions: [-1, -1, 0, 2, 1, 1],
  },
  Em7: {
    name: 'Em7',
    positions: [0, 2, 2, 0, 3, 0],
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
