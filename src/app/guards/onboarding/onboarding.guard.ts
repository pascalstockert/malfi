import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const userSession = await this.authService.getCurrentSession();
    const isAuthenticated = !!userSession?.user;

    if (!isAuthenticated) {
      return true;
    }

    console.log(userSession.user.user_metadata);
    if ('onboarded' in userSession?.user.user_metadata && userSession?.user.user_metadata['onboarded']) {
      return this.router.navigate(['/task']);
    }

    return this.router.navigate(['/onboarding/start']);
  }
}
