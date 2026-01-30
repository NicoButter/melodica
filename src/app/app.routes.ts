import { Routes } from '@angular/router';
import { GuitarraComponent } from './features/instrumento/guitarra.component';
import { PianoComponent } from './features/instrumento/piano.component';
import { SelectorAcordeComponent } from './features/acorde/selector-acorde.component';
import { LandingComponent } from './features/landing/landing.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'guitarra', component: GuitarraComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'acorde', component: SelectorAcordeComponent },
  // Lazy loading example
  // { path: 'piano', loadComponent: () => import('./features/instrumento/piano.component').then(m => m.PianoComponent) }
];
