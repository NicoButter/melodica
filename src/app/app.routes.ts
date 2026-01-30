import { Routes } from '@angular/router';
import { GuitarraComponent } from './features/instrumento/guitarra.component';
import { PianoComponent } from './features/instrumento/piano.component';
import { SelectorAcordeComponent } from './features/acorde/selector-acorde.component';
import { HistorialComponent } from './features/historial/historial.component';

export const routes: Routes = [
  { path: '', redirectTo: '/guitarra', pathMatch: 'full' },
  { path: 'guitarra', component: GuitarraComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'acorde', component: SelectorAcordeComponent },
  { path: 'historial', component: HistorialComponent },
  // Lazy loading example
  // { path: 'piano', loadComponent: () => import('./features/instrumento/piano.component').then(m => m.PianoComponent) }
];
