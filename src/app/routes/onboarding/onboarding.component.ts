import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { OnboardingService } from '../../services/onboarding/onboarding.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageLayoutComponent, ButtonComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  constructor(
    public onboardingService: OnboardingService,
    private router: Router,
    private authService: AuthService,
  ) {}

  get route(): string {
    const fragments = this.router.url.split('/');

    return fragments[fragments.length - 1];
  }


  get pagination(): string {
    const currentIndex = this.onboardingService.getIndexForRoute(this.route);
    const routes = this.onboardingService.routeCount;

    return `${currentIndex + 1} / ${routes}`;
  }

  get isLastRoute(): boolean {
    const currentIndex = this.onboardingService.getIndexForRoute(this.route);
    const routes = this.onboardingService.routeCount;

    return currentIndex + 1 === routes;
  }

  public async completeOnboarding(): Promise<void> {
    await this.authService.updateUserMeta({onboarded: true});
    await this.router.navigate(['/task']);
  }
}
