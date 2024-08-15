import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../components/page-layout/page-layout.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { AuthService } from '../../../services/auth/auth.service';
import { OnboardingService } from '../../../services/onboarding/onboarding.service';

@Component({
  selector: 'app-onboarding-start',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, ButtonComponent],
  templateUrl: './onboarding-start.component.html',
  styleUrl: './onboarding-start.component.scss'
})
export class OnboardingStartComponent {
  route = 'start';
  userName: string | undefined;

  constructor(
    public onboardingService: OnboardingService,
    private authService: AuthService,
  ) {
    this.authService.getCurrentUser()
      .then(user => {
        if (!user.data.user) {
          return;
        }

        if ('name' in user.data.user.user_metadata) {
          this.userName = user.data.user.user_metadata['name'].split(' ')[0];
        }
      });
  }
}
