import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academia.component.html',
  styleUrls: ['./academia.component.scss']
})
export class AcademiaComponent {

  modulos = [
    {
      id: 'figuras',
      title: 'Figuras Rítmicas',
      icon: '♩',
      description: 'Aprende las duraciones de las notas musicales',
      route: '/escuela/figuras',
      color: '#8B4513'
    },
    {
      id: 'compas',
      title: 'Compás',
      icon: '|',
      description: 'Entiende los compases, tiempos y métricas',
      route: '/escuela/compas',
      color: '#6B8E23'
    },
    {
      id: 'pentagrama',
      title: 'Pentagrama',
      icon: '♬',
      description: 'Explora el pentagrama y la escritura musical',
      route: '/escuela/pentagrama',
      color: '#2C3E50'
    },
    {
      id: 'ritmo',
      title: 'Ritmo',
      icon: '♫',
      description: 'Practica patrones rítmicos y pulso musical',
      route: '/escuela/ritmo',
      color: '#8B4513'
    },
    {
      id: 'solfeo',
      title: 'Solfeo',
      icon: '🎵',
      description: 'Practica la lectura y entonación de notas',
      route: '/escuela/solfeo',
      color: '#6B8E23'
    },
    {
      id: 'claves',
      title: 'Claves Musicales',
      icon: '𝄞',
      description: 'Aprende a leer e identificar las claves',
      route: '/escuela/claves',
      color: '#2C3E50'
    },
    {
      id: 'orquesta',
      title: 'La Orquesta',
      icon: '🎻',
      description: 'Conoce los instrumentos de la orquesta sinfónica',
      route: '/escuela/orquesta',
      color: '#8B4513'
    },
    {
      id: 'canciones-patrias',
      title: 'Canciones Patrias',
      icon: '🇦🇷',
      description: 'Aprende nuestras canciones tradicionales argentinas',
      route: '/escuela/canciones-patrias',
      color: '#6B8E23'
    }
  ];

  constructor(private router: Router) {}

  navegarA(route: string): void {
    window.scrollTo(0, 0);
    this.router.navigate([route]);
  }
}
