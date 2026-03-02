import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PatriotiSongsService, PatrioticSong, InstrumentType, SongViewerDisplayComponent } from './index';
import { AudioService } from '../services/audio.service';

/**
 * Componente principal para visualizar Canciones Patrias
 * Gestiona la carga de canciones y la selección de instrumentos
 */
@Component({
  selector: 'app-canciones-patrias',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SongViewerDisplayComponent
  ],
  templateUrl: './canciones-patrias.component.html',
  styleUrls: ['./canciones-patrias.component.scss']
})
export class CancionesPatriasComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  songs: PatrioticSong[] = [];
  selectedSong: PatrioticSong | null = null;
  selectedInstrument: InstrumentType = 'guitarra';
  isLoading = true;
  error: string | null = null;

  // Configuración de instrumentos disponibles
  instruments = [
    { type: 'guitarra' as InstrumentType, displayName: 'Guitarra', icon: '🎸' },
    { type: 'piano' as InstrumentType, displayName: 'Piano', icon: '🎹' },
    { type: 'flauta' as InstrumentType, displayName: 'Flauta Dulce', icon: '🪈' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private songsService: PatriotiSongsService,
    private audioService: AudioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Solo cargar las canciones en el navegador (no en prerendering del servidor)
    if (isPlatformBrowser(this.platformId)) {
      this.loadSongs();
    } else {
      // En SSR, no hacer peticiones HTTP
      this.isLoading = false;
    }
  }

  /**
   * Carga la lista de todas las canciones disponibles
   */
  private loadSongs(): void {
    this.isLoading = true;
    this.songsService
      .getSongsList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (songs) => {
          this.songs = songs;
          this.isLoading = false;

          // Si hay canciones, cargar la primera automáticamente
          if (songs.length > 0) {
            this.selectSong(songs[0]);
          }
        },
        error: (err) => {
          console.error('Error loading songs:', err);
          this.error = 'No se pudieron cargar las canciones patrias';
          this.isLoading = false;
        }
      });
  }

  /**
   * Selecciona una canción para visualizar
   */
  selectSong(song: PatrioticSong): void {
    this.selectedSong = song;
    // Verificar que el instrumento seleccionado esté disponible
    if (!song.instrumentos.includes(this.selectedInstrument)) {
      this.selectedInstrument = song.instrumentos[0] as InstrumentType;
    }
  }

  /**
   * Cambia el instrumento de visualización
   */
  selectInstrument(instrument: InstrumentType): void {
    if (this.selectedSong?.instrumentos.includes(instrument)) {
      this.selectedInstrument = instrument;
    }
  }

  /**
   * Retorna los instrumentos disponibles para la canción actual
   */
  getAvailableInstruments(): InstrumentType[] {
    return this.selectedSong?.instrumentos || [];
  }

  /**
   * Verifica si un instrumento está disponible
   */
  isInstrumentAvailable(instrument: InstrumentType): boolean {
    return this.getAvailableInstruments().includes(instrument);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
