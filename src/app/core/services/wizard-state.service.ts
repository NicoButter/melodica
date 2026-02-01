import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardStateService {
  private currentStepSubject = new BehaviorSubject<number>(1);
  private isWizardActiveSubject = new BehaviorSubject<boolean>(false);

  currentStep$: Observable<number> = this.currentStepSubject.asObservable();
  isWizardActive$: Observable<boolean> = this.isWizardActiveSubject.asObservable();

  setCurrentStep(step: number): void {
    this.currentStepSubject.next(step);
  }

  setWizardActive(active: boolean): void {
    this.isWizardActiveSubject.next(active);
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  reset(): void {
    this.currentStepSubject.next(1);
  }
}
