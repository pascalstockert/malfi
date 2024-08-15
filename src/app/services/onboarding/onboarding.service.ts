import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  routes = [
    'start',
    'goals-tasks'
  ];

  constructor(
    private router: Router,
  ) {}

  get routeCount(): number {
    return this.routes.length;
  }

  public getIndexForRoute(route: string): number {
    return this.routes.findIndex(r => r === route);
  }

  public navigate(index: string, direction: 'next' | 'previous'): Promise<boolean> {
    const nextIndex = this.routes.findIndex(route => route === index) + (direction === 'next' ? 1 : -1)

    return this.router.navigate([`onboarding/${this.routes[nextIndex] ?? index}`]);
  }
}
