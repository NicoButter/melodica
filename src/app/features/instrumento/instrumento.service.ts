import { Injectable, signal } from '@angular/core';

export interface Nota {
  nombre: string;
  frecuencia: number;
}

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  private notasPiano = signal<Nota[]>([
    { nombre: 'C4', frecuencia: 261.63 },
    { nombre: 'D4', frecuencia: 293.66 },
    { nombre: 'E4', frecuencia: 329.63 }
  ]);

  private notasGuitarra = signal<Nota[]>([
    { nombre: 'E2', frecuencia: 82.41 },
    { nombre: 'A2', frecuencia: 110.00 },
    { nombre: 'D3', frecuencia: 146.83 }
  ]);

  getNotasPiano() {
    return this.notasPiano;
  }

  getNotasGuitarra() {
    return this.notasGuitarra;
  }

  tocarNota(nota: Nota) {
    console.log(`Tocando nota: ${nota.nombre} a ${nota.frecuencia} Hz`);
  }
}