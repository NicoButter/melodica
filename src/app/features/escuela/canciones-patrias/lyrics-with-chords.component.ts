import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuitarChordComponent } from '../../../shared/components/guitar-chord/guitar-chord.component';
import { LyricLine } from './patriotic-song.model';

/**
 * Componente para mostrar la letra de una canción con acordes
 * Los acordes se muestran dibujados sobre la letra para guitarra
 */
@Component({
  selector: 'app-lyrics-with-chords',
  standalone: true,
  imports: [CommonModule, GuitarChordComponent],
  templateUrl: './lyrics-with-chords.component.html',
  styleUrls: ['./lyrics-with-chords.component.scss']
})
export class LyricsWithChordsComponent {
  @Input() lyrics: LyricLine[] = [];
  @Input() showChordDiagrams: boolean = true;

  /**
   * Obtiene los fragmentos de la línea entre acordes
   */
  getLineFragments(line: LyricLine): Array<{ text: string; chord?: string }> {
    if (!line.chords || line.chords.length === 0) {
      return [{ text: line.line }];
    }

    const fragments: Array<{ text: string; chord?: string }> = [];
    let lastPosition = 0;

    // Ordenar acordes por posición
    const sortedChords = [...line.chords].sort((a, b) => a.position - b.position);

    for (const chordPos of sortedChords) {
      // Agregar texto antes del acorde
      if (chordPos.position > lastPosition) {
        fragments.push({ text: line.line.substring(lastPosition, chordPos.position) });
      }

      // Agregar el acorde
      fragments.push({ chord: chordPos.chord, text: '' });

      lastPosition = chordPos.position;
    }

    // Agregar texto restante
    if (lastPosition < line.line.length) {
      fragments.push({ text: line.line.substring(lastPosition) });
    }

    return fragments;
  }
}
