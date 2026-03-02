import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrioticSong, InstrumentType, StaffNote, MeasureData } from './patriotic-song.model';
import { LyricsWithChordsComponent } from './lyrics-with-chords.component';
import { AudioService } from '../services/audio.service';

/**
 * Componente que visualiza una canción con:
 * - Pentagrama con notas musicales
 * - Acordes sobre cada compás
 * - Diagramas de guitarra
 * - Soporte para múltiples instrumentos
 */
@Component({
  selector: 'app-song-viewer-display',
  standalone: true,
  imports: [CommonModule, LyricsWithChordsComponent],
  templateUrl: './song-viewer-display.component.html',
  styleUrls: ['./song-viewer-display.component.scss']
})
export class SongViewerDisplayComponent implements OnInit {
  @Input() song!: PatrioticSong;
  @Input() instrument: InstrumentType = 'guitarra';

  // Configuración del pentagrama
  readonly staffLines = [0, 1, 2, 3, 4];
  readonly lineSpacing = 20;
  readonly staffWidth = 900;
  readonly staffHeight = 160;
  readonly leftMargin = 80;
  readonly notesPerStaff = 12;

  // Notas en el pentagrama (clave de sol)
  staffNotes = [
    { id: 'C4', name: 'Do', position: 10 },
    { id: 'D4', name: 'Re', position: 9 },
    { id: 'E4', name: 'Mi', position: 8 },
    { id: 'F4', name: 'Fa', position: 7 },
    { id: 'G4', name: 'Sol', position: 6 },
    { id: 'A4', name: 'La', position: 5 },
    { id: 'B4', name: 'Si', position: 4 },
    { id: 'C5', name: 'Do', position: 3 },
    { id: 'D5', name: 'Re', position: 2 },
    { id: 'E5', name: 'Mi', position: 1 },
    { id: 'F5', name: 'Fa', position: 0 },
    { id: 'G5', name: 'Sol', position: -1 }
  ];

  staffPages: StaffNote[][] = [];
  activeNote: string | null = null;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.prepareStaffPages();
  }

  /**
   * Divide las notas en páginas para visualización en el pentagrama
   */
  private prepareStaffPages(): void {
    this.staffPages = [];
    for (let i = 0; i < this.song.melodia.length; i += this.notesPerStaff) {
      this.staffPages.push(
        this.song.melodia.slice(i, i + this.notesPerStaff)
      );
    }
  }

  /**
   * Calcula la posición Y de una nota en el pentagrama
   */
  getNoteY(position: number | undefined): number {
    const pos = position ?? 5;
    return pos * (this.lineSpacing / 2);
  }

  /**
   * Calcula la posición X de una nota
   */
  getNoteX(index: number, totalInPage: number): number {
    const spacing = (this.staffWidth - this.leftMargin - 100) / (totalInPage + 1);
    return this.leftMargin + spacing * (index + 1);
  }

  /**
   * Obtiene el nombre de la nota para mostrar
   */
  getNoteName(note: StaffNote): string {
    const noteName = note.name || note.note;
    const staffNote = this.staffNotes.find(n => n.id === noteName);
    return (staffNote?.name || noteName) ?? 'C4';
  }

  /**
   * Determina si debe mostrar línea de ayuda (ledger line)
   */
  shouldShowLedgerLine(position: number | undefined): boolean {
    const pos = position ?? 5;
    return pos < -2 || pos > 8;
  }

  /**
   * Obtiene acordes para una página específica
   */
  getChordsForPage(pageIndex: number): MeasureData[] {
    const startIdx = pageIndex * this.notesPerStaff;
    const endIdx = startIdx + this.notesPerStaff;
    return this.song.acordes.filter(
      measure => (measure.measureNumber ?? 0) >= startIdx && (measure.measureNumber ?? 0) < endIdx
    );
  }

  /**
   * Reproduce una nota
   */
  playNote(note: StaffNote): void {
    const audioNote = note.audioNote || note.note || note.name || 'C4';
    this.audioService.resume();
    this.audioService.playNote(audioNote, 0.5);
    this.activeNote = audioNote;

    setTimeout(() => {
      this.activeNote = null;
    }, 500);
  }

  /**
   * Genera diagrama de guitarra para un acorde (preparado para futuro)
   */
  getGuitarChordDiagram(chordName: string): string {
    // Placeholder: implementar con librería de diagramas de acordes
    // Por ahora retorna solo el nombre del acorde
    return chordName;
  }

  /**
   * Obtiene datos de visualización según el instrumento
   */
  getInstrumentDisplayData() {
    return {
      guitarra: {
        icon: '🎸',
        info: 'Toca los acordes en el orden mostrado'
      },
      piano: {
        icon: '🎹',
        info: 'Sigue las notas en el teclado'
      },
      flauta: {
        icon: '🪈',
        info: 'Sigue la melodía en tu flauta dulce'
      }
    };
  }
}
