import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrquestaService, SeccionOrquesta, Instrumento } from './orquesta.service';
import { AudioService } from '../services/audio.service';

/**
 * Componente para visualizar la orquesta y sus instrumentos
 * Muestra secciones de vientos, metales, percusión y cuerdas
 */
@Component({
  selector: 'app-orquesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orquesta.component.html',
  styleUrls: ['./orquesta.component.scss']
})
export class OrquestaComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  secciones: SeccionOrquesta[] = [];
  isLoading = true;
  error: string | null = null;
  reproduciendo: string | null = null;

  constructor(
    private orquestaService: OrquestaService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    // Solo cargar en el navegador, no en el servidor
    if (isPlatformBrowser(this.platformId)) {
      this.cargarOrquesta();
    } else {
      this.isLoading = false;
    }
  }

  private cargarOrquesta(): void {
    this.orquestaService.getOrquesta().subscribe(
      data => {
        this.secciones = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error cargando orquesta:', error);
        this.error = 'No se pudo cargar los instrumentos';
        this.isLoading = false;
      }
    );
  }

  /**
   * Reproduce el sonido de un instrumento
   */
  reproducirSonido(instrumento: Instrumento): void {
    if (!instrumento.audioUrl) {
      console.warn(`No hay audio disponible para ${instrumento.nombre}`);
      return;
    }

    this.reproduciendo = instrumento.id;
    
    // Crear elemento de audio para reproducir
    const audio = new Audio(instrumento.audioUrl);
    audio.onended = () => {
      this.reproduciendo = null;
    };
    audio.play().catch(err => {
      console.error('Error reproduciendo audio:', err);
      this.reproduciendo = null;
    });
  }

  /**
   * Retorna el color de fondo para una sección
   */
  getSeccionColor(seccion: SeccionOrquesta): string {
    const colors: { [key: string]: string } = {
      'viento-madera': 'rgba(139, 90, 43, 0.1)',
      'viento-metal': 'rgba(218, 165, 32, 0.1)',
      'percusion': 'rgba(128, 128, 128, 0.1)',
      'cuerda': 'rgba(210, 105, 30, 0.1)'
    };
    return colors[seccion.id] || 'rgba(100, 100, 100, 0.1)';
  }

  /**
   * Retorna el color del borde para una sección
   */
  getSeccionBorderColor(seccion: SeccionOrquesta): string {
    const colors: { [key: string]: string } = {
      'viento-madera': '#8B5A2B',
      'viento-metal': '#DAA520',
      'percusion': '#808080',
      'cuerda': '#D2691E'
    };
    return colors[seccion.id] || '#666';
  }
}
