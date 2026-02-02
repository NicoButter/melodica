/**
 * Chord Formatter Utility
 * Converts chord names to proper musical notation with Unicode symbols
 */

/**
 * Format a chord name to use proper musical notation
 * Replaces "b" with ♭ (flat), "#" with ♯ (sharp)
 * Normalizes the chord name for display
 *
 * @example
 * formatChordName('Bb') // Returns 'B♭'
 * formatChordName('F#') // Returns 'F♯'
 * formatChordName('Cm7') // Returns 'Cm7'
 * formatChordName('Eb7') // Returns 'E♭7'
 */
export function formatChordName(chordName: string): string {
  if (!chordName) return '';

  // Replace flats: "b" with ♭ (but only when it's after a note letter)
  let formatted = chordName.replace(/([A-G])b/g, '$1♭');

  // Replace sharps: "#" with ♯
  formatted = formatted.replace(/#/g, '♯');

  return formatted;
}

/**
 * Normalize a chord name for internal use (removes symbols)
 * Converts B♭ -> Bb, F♯ -> F#, etc.
 *
 * @example
 * normalizeChordName('B♭') // Returns 'Bb'
 * normalizeChordName('F♯') // Returns 'F#'
 */
export function normalizeChordName(chordName: string): string {
  if (!chordName) return '';

  // Replace ♭ with b
  let normalized = chordName.replace(/♭/g, 'b');

  // Replace ♯ with #
  normalized = normalized.replace(/♯/g, '#');

  return normalized;
}
