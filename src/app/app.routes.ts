import { Routes } from '@angular/router';
import { GuitarraComponent } from './features/instrumento/guitarra.component';
import { PianoComponent } from './features/instrumento/piano.component';
import { NoteDetectorComponent } from './features/instrumento/note-detector.component';
import { SelectorAcordeComponent } from './features/acorde/selector-acorde.component';
import { LandingComponent } from './features/landing/landing.component';
import { AboutComponent } from './features/about/about.component';
import { ComposerPageComponent } from './features/composer/composer.page';
import { SongbookPageComponent } from './features/songbook/songbook.page';
import { TerminosComponent } from './features/terminos/terminos.component';
import { EscuelaComponent } from './features/escuela/escuela.component';
import { FigurasRitmicasComponent } from './features/escuela/figuras-ritmicas/figuras-ritmicas.component';
import { CompasComponent } from './features/escuela/compas/compas.component';
import { PentagramaComponent } from './features/escuela/pentagrama/pentagrama.component';
import { RitmoComponent } from './features/escuela/ritmo/ritmo.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'compose', component: ComposerPageComponent },
  { path: 'songbook', component: SongbookPageComponent },
  { path: 'note-detector', component: NoteDetectorComponent },
  { path: 'guitarra', component: GuitarraComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'acorde', component: SelectorAcordeComponent },
  {
    path: 'escuela',
    component: EscuelaComponent,
    children: [
      { path: 'figuras', component: FigurasRitmicasComponent },
      { path: 'compas', component: CompasComponent },
      { path: 'pentagrama', component: PentagramaComponent },
      { path: 'ritmo', component: RitmoComponent }
    ]
  },
  // Lazy loading example
  // { path: 'piano', loadComponent: () => import('./features/instrumento/piano.component').then(m => m.PianoComponent) }
];
