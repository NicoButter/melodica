import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Clave {
  id: string;
  nombre: string;
  simbolo: string;
  rango: string;
  linea: number;
  descripcion: string;
  instrumentos: string;
  notaReferencia: string;
  icon: string;
}

interface Quiz {
  id: string;
  pregunta: string;
  claveId: string;
  nota: string;
  opciones: string[];
  respuestaCorrecta: string;
}

@Component({
  selector: 'app-claves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claves.component.html',
  styleUrls: ['./claves.component.scss']
})
export class ClavesComponent implements OnInit, OnDestroy {
  claves: Clave[] = [
    {
      id: 'sol',
      nombre: 'Clave de Sol',
      simbolo: '𝄞',
      rango: 'Agudo',
      linea: 2,
      descripcion: 'La línea donde se apoya el símbolo es la segunda línea del pentagrama, indicando la nota Sol.',
      instrumentos: 'Violín, Flauta, Trompeta, Piano (mano derecha), Guitarra',
      notaReferencia: 'Sol',
      icon: '🎻'
    },
    {
      id: 'fa',
      nombre: 'Clave de Fa',
      simbolo: '𝄢',
      rango: 'Grave',
      linea: 4,
      descripcion: 'La línea donde se apoya el símbolo es la cuarta línea del pentagrama, indicando la nota Fa.',
      instrumentos: 'Bajo, Violoncello, Trompa, Piano (mano izquierda), Tuba',
      notaReferencia: 'Fa',
      icon: '🎸'
    },
    {
      id: 'do',
      nombre: 'Clave de Do',
      simbolo: '𝄡',
      rango: 'Medio',
      linea: 3,
      descripcion: 'La línea donde se apoya el símbolo es la tercera línea del pentagrama, indicando la nota Do. Posición estándar: Do en tercera línea.',
      instrumentos: 'Viola, Violoncello (música antigua), Trompa',
      notaReferencia: 'Do',
      icon: '🎼'
    }
  ];

  sections = [
    {
      id: 'intro',
      title: 'Introducción a las Claves',
      icon: '📖',
      description: 'Entiende qué son las claves y para qué sirven',
      type: 'intro'
    },
    {
      id: 'claves-estudio',
      title: 'Estudio de Claves',
      icon: '🔍',
      description: 'Aprende cada clave en detalle con sus características',
      type: 'study'
    },
    {
      id: 'practiceQuiz',
      title: 'Identifica la Clave',
      icon: '❓',
      description: 'Completa cuestionarios para reforzar tu aprendizaje',
      type: 'practice'
    },
    {
      id: 'comparison',
      title: 'Comparación de Claves',
      icon: '⚖️',
      description: 'Compara las tres claves principales lado a lado',
      type: 'comparison'
    }
  ];

  quizzes: Quiz[] = [
    {
      id: '1',
      pregunta: '¿Cuál es la clave que usan los violines?',
      claveId: 'sol',
      nota: 'Sol',
      opciones: ['Clave de Fa', 'Clave de Sol', 'Clave de Do'],
      respuestaCorrecta: 'Clave de Sol'
    },
    {
      id: '2',
      pregunta: '¿En qué línea se apoya la Clave de Fa?',
      claveId: 'fa',
      nota: 'Fa',
      opciones: ['Segunda línea', 'Tercera línea', 'Cuarta línea'],
      respuestaCorrecta: 'Cuarta línea'
    },
    {
      id: '3',
      pregunta: '¿Cuál es el rango de la Clave de Do?',
      claveId: 'do',
      nota: 'Do',
      opciones: ['Agudo', 'Grave', 'Medio'],
      respuestaCorrecta: 'Medio'
    },
    {
      id: '4',
      pregunta: '¿Qué clave usa la mano izquierda del piano?',
      claveId: 'fa',
      nota: 'Fa',
      opciones: ['Clave de Sol', 'Clave de Fa', 'Clave de Do'],
      respuestaCorrecta: 'Clave de Fa'
    }
  ];

  selectedClaveId: string | null = null;
  selectedSection: string | null = null;
  currentQuizIndex: number = 0;
  quizScore: number = 0;
  userAnswers: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  selectClave(claveId: string): void {
    this.selectedClaveId = claveId;
  }

  selectSection(sectionId: string): void {
    this.selectedSection = sectionId;
    if (sectionId === 'practiceQuiz') {
      this.startQuiz();
    }
  }

  getClaveById(id: string): Clave | undefined {
    return this.claves.find(c => c.id === id);
  }

  startQuiz(): void {
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];
  }

  selectAnswer(answer: string): void {
    const quiz = this.quizzes[this.currentQuizIndex];
    this.userAnswers.push(answer);

    if (answer === quiz.respuestaCorrecta) {
      this.quizScore++;
    }

    // Move to next question after a short delay
    setTimeout(() => {
      this.nextQuestion();
    }, 500);
  }

  nextQuestion(): void {
    if (this.currentQuizIndex < this.quizzes.length - 1) {
      this.currentQuizIndex++;
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.selectedSection = 'quizComplete';
  }

  resetQuiz(): void {
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];
    this.selectedSection = null;
  }

  getPercentage(): number {
    return Math.round((this.quizScore / this.quizzes.length) * 100);
  }

  backToMenu(): void {
    this.selectedSection = null;
    this.selectedClaveId = null;
  }
}
