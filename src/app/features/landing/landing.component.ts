import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FooterComponent } from '../../core/layout/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

}