import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.scss']
})
export class EscuelaComponent implements OnDestroy {
  sections = [
    {
      id: 'figuras',
      title: 'Figuras Rítmicas',
      icon: '♪',
      description: 'Aprende las duraciones de las notas',
      route: '/escuela/figuras'
    },
    {
      id: 'compas',
      title: 'Compás',
      icon: '|',
      description: 'Entiende los compases y tiempos',
      route: '/escuela/compas'
    },
    {
      id: 'pentagrama',
      title: 'Pentagrama',
      icon: '♬',
      description: 'Explora el pentagrama y las notas',
      route: '/escuela/pentagrama'
    },
    {
      id: 'ritmo',
      title: 'Ritmo',
      icon: '♫',
      description: 'Practica patrones rítmicos',
      route: '/escuela/ritmo'
    }
  ];

  ngOnDestroy(): void {
    // Ensure we're in browser environment
    if (typeof document !== 'undefined') {
      document.body.classList.remove('scrolled');
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Ensure we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }
}
