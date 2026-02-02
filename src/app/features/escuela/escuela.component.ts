import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.scss']
})
export class EscuelaComponent {
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
}
