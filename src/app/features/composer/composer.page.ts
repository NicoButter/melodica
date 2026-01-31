import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposerService } from './services/composer.service';
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
export class ComposerPageComponent implements OnInit {
  currentStep = 1;

  constructor(private composerService: ComposerService) {}

  ngOnInit(): void {
    this.updateCurrentStep();
  }

  private updateCurrentStep(): void {
    this.currentStep = this.composerService.getCurrentStep();
  }

  onStepChange(): void {
    this.updateCurrentStep();
  }

  onReset(): void {
    this.composerService.reset();
    this.updateCurrentStep();
  }
}