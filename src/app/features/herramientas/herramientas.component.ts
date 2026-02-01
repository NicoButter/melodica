import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss']
})
export class HerramientasComponent {
  tools = [
    {
      id: 'composer',
      title: 'Compositor',
      description: 'Crea tus propias melodías con nuestro compositor intuitivo',
      icon: '🎼',
      route: '/composer',
      color: 'bohemian-gold'
    },
    {
      id: 'songbook',
      title: 'Cancionero',
      description: 'Guarda y organiza tus composiciones favoritas',
      icon: '📖',
      route: '/songbook',
      color: 'bohemian-brown'
    },
    {
      id: 'workshop',
      title: 'Taller Musical',
      description: 'Afina tu instrumento y practica con ejercicios guiados',
      icon: '🎸',
      route: '#taller',
      color: 'bohemian-sage'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(tool: any) {
    if (tool.route.startsWith('#')) {
      const element = document.querySelector(tool.route);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate([tool.route]);
    }
  }
}
