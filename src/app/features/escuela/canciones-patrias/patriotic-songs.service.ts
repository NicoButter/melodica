import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PatrioticSong } from './patriotic-song.model';

/**
 * Servicio para cargar y gestionar Canciones Patrias
 * Implementa patrón singleton para cachear datos
 */
@Injectable({
  providedIn: 'root'
})
export class PatriotiSongsService {
  private readonly dataPath = 'assets/data/patriotic-songs';
  private readonly songsIndexFile = `${this.dataPath}/index.json`;
  private songsCache: Set<string> = new Set();
  private loadedSongs: Map<string, PatrioticSong> = new Map();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todas las canciones disponibles
   */
  getSongsList(): Observable<PatrioticSong[]> {
    return this.http.get<PatrioticSong[]>(this.songsIndexFile).pipe(
      catchError(error => {
        console.error('Error cargando lista de canciones:', error);
        // Retorna array vacío si falla (útil para desarrollo offline)
        return of([]);
      })
    );
  }

  /**
   * Obtiene una canción específica por ID
   */
  getSongById(id: string): Observable<PatrioticSong> {
    // Verificar caché primero
    if (this.loadedSongs.has(id)) {
      return of(this.loadedSongs.get(id)!);
    }

    const songPath = `${this.dataPath}/${id}.json`;
    return this.http.get<PatrioticSong>(songPath).pipe(
      map(song => {
        // Guardar en caché
        this.loadedSongs.set(id, song);
        this.songsCache.add(id);
        return song;
      }),
      catchError(error => {
        console.error(`Error cargando canción ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Obtiene canciones por dificultad
   */
  getSongsByDifficulty(
    difficulty: 'basica' | 'intermedia' | 'avanzada'
  ): Observable<PatrioticSong[]> {
    return this.getSongsList().pipe(
      map(songs => songs.filter(song => song.dificultad === difficulty))
    );
  }

  /**
   * Obtiene canciones disponibles para un instrumento específico
   */
  getSongsByInstrument(
    instrument: 'guitarra' | 'piano' | 'flauta'
  ): Observable<PatrioticSong[]> {
    return this.getSongsList().pipe(
      map(songs => songs.filter(song => song.instrumentos.includes(instrument)))
    );
  }

  /**
   * Retorna el estado del caché
   */
  getCacheStats(): { cached: number; total: string[] } {
    return {
      cached: this.songsCache.size,
      total: Array.from(this.loadedSongs.keys())
    };
  }

  /**
   * Limpia el caché (útil para recargar datos)
   */
  clearCache(): void {
    this.loadedSongs.clear();
    this.songsCache.clear();
  }
}
