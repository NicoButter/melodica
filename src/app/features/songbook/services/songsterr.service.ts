import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface Song {
  id: number;
  title: string;
  artist: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SongsterrService {
  // Use Netlify Function to avoid CORS issues
  private apiUrl = '/.netlify/functions/songsterr';

  constructor(private http: HttpClient) {}

  searchSongs(query: string): Observable<Song[]> {
    if (!query || query.trim().length === 0) {
      return throwError(() => new Error('Search query cannot be empty'));
    }

    const params = { pattern: query.trim() };
    return this.http.get<{ results: Song[] }>(this.apiUrl, { params }).pipe(
      map(response => response.results || []),
      catchError(error => {
        console.error('Song search failed:', {
          message: error.message,
          status: error.status,
          query,
        });
        return throwError(() => new Error('Failed to search songs. Please try again.'));
      })
    );
  }
}