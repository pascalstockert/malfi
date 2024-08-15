import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { OnboardingService } from '../../services/onboarding/onboarding.service';

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
  ) {}

  get route(): string {
    const fragments = this.router.url.split('/');

    return fragments[fragments.length - 1];
  }

  get pagination(): string {
    const currentIndex = this.onboardingService.getIndexForRoute(this.route);
    const pages = this.onboardingService.routeCount;

    return `${currentIndex + 1} / ${pages}`;
  }
}
