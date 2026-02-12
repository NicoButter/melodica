import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';

interface StaffNote {
  id: string;
  name: string;
  octave: number;
  position: number; // Y position on staff (0 = top line)
  audioNote: string;
}

@Component({
  selector: 'app-pentagrama',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pentagrama.component.html',
  styleUrls: ['./pentagrama.component.scss']
})
export class PentagramaComponent {
  activeNote: string | null = null;

  // Staff configuration
  readonly staffLines = [0, 1, 2, 3, 4];
  readonly lineSpacing = 20;
  readonly staffWidth = 980;
  readonly staffHeight = 160;
  // Leave extra room for the treble clef so notes do not overlap it
  readonly leftMargin = 160;

  // Notes on the staff (treble clef)
  notes: StaffNote[] = [
    { id: 'C4', name: 'Do', octave: 4, position: 10, audioNote: 'C4' },
    { id: 'D4', name: 'Re', octave: 4, position: 9, audioNote: 'D4' },
    { id: 'E4', name: 'Mi', octave: 4, position: 8, audioNote: 'E4' },
    { id: 'F4', name: 'Fa', octave: 4, position: 7, audioNote: 'F4' },
    { id: 'G4', name: 'Sol', octave: 4, position: 6, audioNote: 'G4' },
    { id: 'A4', name: 'La', octave: 4, position: 5, audioNote: 'A4' },
    { id: 'B4', name: 'Si', octave: 4, position: 4, audioNote: 'B4' },
    { id: 'C5', name: 'Do', octave: 5, position: 3, audioNote: 'C5' },
    { id: 'D5', name: 'Re', octave: 5, position: 2, audioNote: 'D5' },
    { id: 'E5', name: 'Mi', octave: 5, position: 1, audioNote: 'E5' },
    { id: 'F5', name: 'Fa', octave: 5, position: 0, audioNote: 'F5' },
    { id: 'G5', name: 'Sol', octave: 5, position: -1, audioNote: 'G5' },
    { id: 'A5', name: 'La', octave: 5, position: -2, audioNote: 'A5' },
    { id: 'B5', name: 'Si', octave: 5, position: -3, audioNote: 'B5' },
  ];

  constructor(private audio: AudioService) {}

  playNote(note: StaffNote): void {
    this.audio.resume();
    this.audio.playNote(note.audioNote, 1);
    this.activeNote = note.id;

    setTimeout(() => {
      this.activeNote = null;
    }, 1000);
  }

  getNoteY(position: number): number {
    // Position 0 = top line of staff
    // Each position = lineSpacing / 2
    return position * (this.lineSpacing / 2);
  }

  getNoteX(index: number): number {
    const spacing = (this.staffWidth - this.leftMargin - 100) / (this.notes.length + 1);
    return this.leftMargin + spacing * (index + 1);
  }

  shouldShowLedgerLine(position: number): boolean {
    // Show ledger lines for notes above or below the staff
    return position < -2 || position > 8;
  }

  getLedgerLineY(position: number): number {
    return this.getNoteY(position);
  }
}
