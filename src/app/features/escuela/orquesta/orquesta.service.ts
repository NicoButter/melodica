import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instrumento {
  id: string;
  nombre: string;
  seccion: 'viento-madera' | 'viento-metal' | 'percusion' | 'cuerda';
  descripcion: string;
  imagenUrl: string;
  audioUrl?: string;
  videoUrl?: string;
  datosCuriosos?: string[];
  rangoTonal?: {
    notaMinima: string;
    notaMaxima: string;
  };
  ubicacionOrquesta?: {
    fila: string;
    posicion: string;
  };
}

export interface SeccionOrquesta {
  id: string;
  nombre: string;
  icon: string;
  color: string;
  instrumentos: Instrumento[];
}

@Injectable({
  providedIn: 'root'
})
export class OrquestaService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las secciones de la orquesta con sus instrumentos
   */
  getOrquesta(): Observable<SeccionOrquesta[]> {
    return this.http.get<SeccionOrquesta[]>('/assets/data/orquesta-instruments.json');
  }

  /**
   * Obtiene una sección específica
   */
  getSeccion(seccionId: string): Observable<SeccionOrquesta> {
    return this.http.get<SeccionOrquesta>(`/assets/data/orquesta-instruments.json`);
  }
}
