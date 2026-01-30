import { Component, signal } from '@angular/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { TallerComponent } from './features/taller/taller.component';
import { AboutComponent } from './features/about/about.component';
import { FooterComponent } from './core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, TallerComponent, AboutComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('melodica');
}
