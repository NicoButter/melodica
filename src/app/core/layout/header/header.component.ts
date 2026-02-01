import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { WizardStateService } from '../../services/wizard-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isShrunk = false;
  isComposerPage = false;
  pageTitle = '';
  currentStep = 1;
  showWizardProgress = false;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private wizardStateService: WizardStateService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageContext(event.url);
      });
    
    // Initialize on component creation
    this.updatePageContext(this.router.url);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.wizardStateService.currentStep$.subscribe(step => {
        this.currentStep = step;
      })
    );

    this.subscriptions.add(
      this.wizardStateService.isWizardActive$.subscribe(active => {
        this.showWizardProgress = active && this.isShrunk;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isShrunk = scrollTop > 50;
    this.showWizardProgress = this.isComposerPage && this.isShrunk;
  }

  private updatePageContext(url: string): void {
    this.isComposerPage = url.includes('/compose');
    
    if (this.isComposerPage) {
      this.pageTitle = '🎼 Compositor Musical';
    } else {
      this.pageTitle = '';
    }
  }
}