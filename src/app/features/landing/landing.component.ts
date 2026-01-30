import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { TallerComponent } from '../taller/taller.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../../core/layout/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, TallerComponent, AboutComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

}