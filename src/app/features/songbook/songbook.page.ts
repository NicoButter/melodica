import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongsterrService, Song } from './services/songsterr.service';

@Component({
  selector: 'app-songbook-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './songbook.page.html',
  styleUrls: ['./songbook.page.scss']
})
export class SongbookPageComponent {
  searchQuery = '';
  songs: Song[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private songsterrService: SongsterrService) {}

  searchSongs() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.songs = [];

    this.songsterrService.searchSongs(this.searchQuery).subscribe({
      next: (songs) => {
        this.songs = songs;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al buscar canciones. Inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }
}