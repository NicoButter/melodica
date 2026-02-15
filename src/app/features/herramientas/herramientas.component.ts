import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss']
})
export class HerramientasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('toolsGrid') toolsGrid!: ElementRef;
  private intersectionObserver?: IntersectionObserver;
  cardAnimationState: { [key: string]: boolean } = {};

  tools = [
    {
      id: 'composer',
      title: 'Compositor',
      description: 'Crea tus propias melodías con nuestro compositor intuitivo',
      icon: '🎼',
      route: '/compose',
      color: 'bohemian-gold'
    },
    {
      id: 'escuela',
      title: 'Escuelita',
      description: 'Aprende teoría musical de forma interactiva y visual',
      icon: '🎓',
      route: '/escuela',
      color: 'bohemian-purple'
    },
    {
      id: 'songbook',
      title: 'Cancionero',
      description: 'Busca tus canciones favoritas',
      icon: '📖',
      route: '/songbook',
      color: 'bohemian-brown'
    },
    {
      id: 'note-detector',
      title: 'Detección de Nota',
      description: 'Detecta notas con tu micrófono y obtén sugerencias de progresiones en tiempo real',
      icon: '🎤',
      route: '/note-detector',
      color: 'bohemian-accent'
    }
    // {
    //   id: 'workshop',
    //   title: 'Taller Musical',
    //   description: 'Afina tu instrumento y practica con ejercicios guiados',
    //   icon: '🎸',
    //   route: '#taller',
    //   color: 'bohemian-sage'
    // }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initIntersectionObserver();
  }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private initIntersectionObserver(): void {
    // Check if IntersectionObserver is available (not available in SSR or older browsers)
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: trigger animations immediately for all cards
      this.tools.forEach(tool => {
        this.cardAnimationState[tool.id] = true;
      });
      return;
    }

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-tool-id');
        if (cardId) {
          if (entry.isIntersecting) {
            this.cardAnimationState[cardId] = true;
          } else {
            // Reset animation when card leaves viewport
            this.cardAnimationState[cardId] = false;
          }
        }
      });
    }, options);
  }

  private setupScrollReveal(): void {
    if (!this.toolsGrid) return;

    const cards = this.toolsGrid.nativeElement.querySelectorAll('.tool-card');
    cards.forEach((card: HTMLElement) => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(card);
      }
    });
  }

  navigateTo(tool: any) {
    if (tool.route.startsWith('#')) {
      // Ensure we're in browser environment
      if (typeof document !== 'undefined') {
        const element = document.querySelector(tool.route);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate([tool.route]);
    }
  }
}
