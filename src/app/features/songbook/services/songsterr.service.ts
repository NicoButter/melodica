import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
  private apiUrl = 'https://www.songsterr.com/a/ra/songs.json';

  constructor(private http: HttpClient) {}

  searchSongs(query: string): Observable<Song[]> {
    const url = `${this.apiUrl}?pattern=${encodeURIComponent(query)}`;
    return this.http.get<Song[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching songs:', error);
        return throwError(() => new Error('Failed to fetch songs'));
      })
    );
  }
}