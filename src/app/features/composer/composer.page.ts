import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService } from './services/composer.service';
import { WizardStateService } from '../../core/services/wizard-state.service';
import { MoodStepComponent } from './steps/mood-step/mood-step.component';
import { RootStepComponent } from './steps/root-step/root-step.component';
import { HarmonyStepComponent } from './steps/harmony-step/harmony-step.component';
import { ResultStepComponent } from './steps/result-step/result-step.component';

@Component({
  selector: 'app-composer-page',
  standalone: true,
  imports: [
    CommonModule,
    MoodStepComponent,
    RootStepComponent,
    HarmonyStepComponent,
    ResultStepComponent
  ],
  templateUrl: './composer.page.html',
  styleUrls: ['./composer.page.scss']
})
export class ComposerPageComponent implements OnInit, OnDestroy {
  currentStep = 1;

  constructor(
    private composerService: ComposerService,
    private wizardStateService: WizardStateService
  ) {}

  ngOnInit(): void {
    this.wizardStateService.setWizardActive(true);
    this.updateCurrentStep();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scrolled');
    this.wizardStateService.setWizardActive(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }

  private updateCurrentStep(): void {
    this.currentStep = this.composerService.getCurrentStep();
    this.wizardStateService.setCurrentStep(this.currentStep);
  }

  onStepChange(): void {
    this.updateCurrentStep();
  }

  onReset(): void {
    this.composerService.reset();
    this.wizardStateService.reset();
    this.updateCurrentStep();
  }
}