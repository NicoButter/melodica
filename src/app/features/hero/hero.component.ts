import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  scrollToHerramientas(): void {
    // Ensure we're in browser environment
    if (typeof document === 'undefined') {
      return;
    }

    const element = document.querySelector('#herramientas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}