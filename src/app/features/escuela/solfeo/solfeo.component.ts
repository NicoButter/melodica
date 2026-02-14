import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solfeo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solfeo.component.html',
  styleUrls: ['./solfeo.component.scss']
})
export class SolfeoComponent implements OnInit, OnDestroy {
  currentNote: string = 'Do';
  currentOctave: number = 4;
  isPlaying: boolean = false;
  score: number = 0;
  sequence: string[] = [];
  userSequence: string[] = [];
  level: number = 1;
  
  notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  
  exercises = [
    {
      id: 'ascending',
      title: 'Escala Ascendente',
      icon: '📈',
      description: 'Canta o toca la escala hacia arriba: Do Re Mi Fa Sol La Si',
      type: 'exercise'
    },
    {
      id: 'descending',
      title: 'Escala Descendente',
      icon: '📉',
      description: 'Canta o toca la escala hacia abajo: Si La Sol Fa Mi Re Do',
      type: 'exercise'
    },
    {
      id: 'intervals',
      title: 'Intervalos',
      icon: '↗️',
      description: 'Practica reconocer y cantar intervalos musicales',
      type: 'exercise'
    },
    {
      id: 'dictado',
      title: 'Dictado Musical',
      icon: '👂',
      description: 'Escucha secuencias de notas e identifícalas',
      type: 'exercise'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.shuffleNotes();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  shuffleNotes(): void {
    // Generate random sequence for practice
    this.sequence = [];
    const length = Math.min(3 + this.level, 8);
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.notes.length);
      this.sequence.push(this.notes[randomIndex]);
    }
  }

  playNote(note: string): void {
    // This would integrate with the audio service
    console.log('Playing note:', note);
  }

  startPractice(exerciseId: string): void {
    console.log('Starting practice:', exerciseId);
    this.userSequence = [];
    this.score = 0;
    this.level = 1;
  }

  selectNote(note: string): void {
    this.userSequence.push(note);
    this.playNote(note);
    this.checkSequence();
  }

  checkSequence(): void {
    // Check if user sequence matches the target
    for (let i = 0; i < this.userSequence.length; i++) {
      if (this.userSequence[i] !== this.sequence[i]) {
        // Wrong note
        this.userSequence = [];
        return;
      }
    }

    if (this.userSequence.length === this.sequence.length) {
      // Correct sequence completed
      this.score++;
      this.level++;
      this.userSequence = [];
      this.shuffleNotes();
    }
  }

  resetPractice(): void {
    this.userSequence = [];
    this.score = 0;
    this.level = 1;
    this.shuffleNotes();
  }
}
