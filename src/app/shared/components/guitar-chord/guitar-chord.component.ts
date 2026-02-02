import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getChordData } from '../../data/guitar-chords';
import { formatChordName } from '../../utils/chord-formatter';

/**
 * Guitar Chord Diagram Component
 * Renders a visual SVG diagram of a guitar chord
 * Displays fret positions and fingering for the 6 strings
 */
@Component({
  selector: 'app-guitar-chord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guitar-chord.component.html',
  styleUrls: ['./guitar-chord.component.scss'],
})
export class GuitarChordComponent {
  @Input() chordName: string = '';
  @Input() compact: boolean = false;

  // SVG dimensions
  readonly stringSpacing = 20;
  readonly fretHeight = 20;
  readonly numFrets = 4; // Display first 4 frets
  readonly dotRadius = 7;
  readonly nutHeight = 4;
  readonly topMargin = 25;
  readonly bottomMargin = 20;
  readonly stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];

  get chordData() {
    return getChordData(this.chordName);
  }

  /**
   * Get formatted chord name with proper musical notation
   */
  get formattedChordName(): string {
    return formatChordName(this.chordData.name);
  }

  get maxFret() {
    return Math.max(...this.chordData.positions.filter((p) => p > 0), this.numFrets);
  }

  get svgWidth() {
    return this.stringSpacing * 5 + 30; // 5 spaces between 6 strings + margins
  }

  get svgHeight() {
    const fretRows = Math.max(this.maxFret, this.numFrets);
    return this.topMargin + this.nutHeight + fretRows * this.fretHeight + this.bottomMargin;
  }

  /**
   * Get X position for a string (0-5, left to right)
   */
  getStringX(stringIndex: number): number {
    return 15 + stringIndex * this.stringSpacing;
  }

  /**
   * Get Y position for a fret line (1-based)
   * Fret lines are the horizontal lines
   */
  getFretLineY(fret: number): number {
    return this.topMargin + this.nutHeight + fret * this.fretHeight;
  }

  /**
   * Get Y position for a finger dot BETWEEN frets
   * CRITICAL: Dots must be centered between frets, not on fret lines
   * Formula: (fretIndex - 0.5) * fretHeight
   */
  getFingerDotY(fret: number): number {
    return this.topMargin + this.nutHeight + (fret - 0.5) * this.fretHeight;
  }

  /**
   * Check if a string is muted
   */
  isMuted(stringIndex: number): boolean {
    return this.chordData.positions[stringIndex] === -1;
  }

  /**
   * Check if a string is open (not pressed)
   */
  isOpen(stringIndex: number): boolean {
    return this.chordData.positions[stringIndex] === 0;
  }

  /**
   * Get the fret number for a string
   */
  getFretNumber(stringIndex: number): number {
    return this.chordData.positions[stringIndex];
  }

  /**
   * Check if string should show indicator (muted or open)
   */
  showIndicator(stringIndex: number): boolean {
    return this.isMuted(stringIndex) || this.isOpen(stringIndex);
  }

  /**
   * Get Y position for string indicators (X or O above the nut)
   */
  getIndicatorY(): number {
    return this.topMargin - 5;
  }

  /**
   * Get fret range to display (fret lines)
   */
  getFretRange(): number[] {
    const max = Math.max(this.maxFret, this.numFrets);
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  /**
   * Get strings affected by barre chord
   */
  getBarreInfo() {
    if (!this.chordData.barre) return null;

    const barreFret = this.chordData.barre;
    const affectedStrings = this.chordData.positions
      .map((pos, idx) => (pos === barreFret ? idx : -1))
      .filter((idx) => idx !== -1);

    if (affectedStrings.length < 2) return null;

    return {
      fret: barreFret,
      startString: affectedStrings[0],
      endString: affectedStrings[affectedStrings.length - 1],
      y: this.getFingerDotY(barreFret),
    };
  }

  /**
   * Check if a string should show individual dot (not part of barre)
   */
  shouldShowDot(stringIndex: number): boolean {
    const fret = this.getFretNumber(stringIndex);
    if (fret <= 0) return false;

    // If there's a barre and this string is at the barre fret, don't show individual dot
    if (this.chordData.barre && fret === this.chordData.barre) {
      return false;
    }

    return true;
  }
}
