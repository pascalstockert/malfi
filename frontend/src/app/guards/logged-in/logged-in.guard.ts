import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const userSession = await this.authService.getCurrentSession();
    const isAuthenticated = !!userSession?.user;

    if (!isAuthenticated) {
      return this.router.navigate(['auth/login']);
    }

    return true;
  }
}
