import { Injectable, signal } from '@angular/core';

export interface Acorde {
  nombre: string;
  notas: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AcordeService {
  private acordes = signal<Acorde[]>([
    { nombre: 'C Major', notas: ['C', 'E', 'G'] },
    { nombre: 'D Minor', notas: ['D', 'F', 'A'] },
    { nombre: 'G Major', notas: ['G', 'B', 'D'] }
  ]);

  getAcordesSugeridos() {
    return this.acordes;
  }

  agregarAcorde(acorde: Acorde) {
    this.acordes.update(acordes => [...acordes, acorde]);
  }
}