import { Component, HostListener, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.scss']
})
export class EscuelaComponent implements OnInit, OnDestroy {
  @ViewChild('contentArea', { static: false }) contentArea: ElementRef | undefined;
  sections = [
    {
      id: 'figuras',
      title: 'Figuras Rítmicas',
      icon: '♪',
      description: 'Aprende las duraciones de las notas',
      route: '/escuela/figuras',
      image: 'assets/images/escuela/figuras.png'
    },
    {
      id: 'compas',
      title: 'Compás',
      icon: '|',
      description: 'Entiende los compases y tiempos',
      route: '/escuela/compas',
      image: 'assets/images/escuela/compas.png'
    },
    {
      id: 'pentagrama',
      title: 'Pentagrama',
      icon: '♬',
      description: 'Explora el pentagrama y las notas',
      route: '/escuela/pentagrama',
      image: 'assets/images/escuela/pentagrama.png'
    },
    {
      id: 'ritmo',
      title: 'Ritmo',
      icon: '♫',
      description: 'Practica patrones rítmicos',
      route: '/escuela/ritmo',
      image: 'assets/images/escuela/ritmo.png'
    },
    {
      id: 'solfeo',
      title: 'Solfeo',
      icon: '🎵',
      description: 'Practica la lectura y entonación de notas',
      route: '/escuela/solfeo',
      image: 'assets/images/escuela/solfeo.png'
    },
    {
      id: 'claves',
      title: 'Claves Musicales',
      icon: '🎼',
      description: 'Aprende a leer e identificar las claves',
      route: '/escuela/claves',
      image: 'assets/images/escuela/claves.png'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Hacer scroll cuando hay cambio de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToContent();
      });
  }

  navigateToSection(route: string): void {
    this.router.navigate([route]);
  }

  private scrollToContent(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Esperar a que el contenido se renderice antes de hacer scroll
    setTimeout(() => {
      const container = document.querySelector('.escuela-container');
      if (container) {
        const outlet = container.querySelector('router-outlet')?.nextElementSibling;
        if (outlet) {
          outlet.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  }

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
