import { Injectable, signal } from '@angular/core';

export interface Configuracion {
  tonalidades: string[];
  colores: { [key: string]: string };
  acordesBase: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = signal<Configuracion>({
    tonalidades: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    colores: {
      primary: '#007bff',
      secondary: '#6c757d',
      accent: '#28a745'
    },
    acordesBase: ['Major', 'Minor', 'Diminished', 'Augmented']
  });

  getConfig() {
    return this.config;
  }

  updateConfig(newConfig: Partial<Configuracion>) {
    this.config.update(config => ({ ...config, ...newConfig }));
  }
}