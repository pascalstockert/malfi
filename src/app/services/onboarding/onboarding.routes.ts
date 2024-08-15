import { OnboardingComponent } from '../../routes/onboarding/onboarding.component';
import { LoggedInGuard } from '../../guards/logged-in/logged-in.guard';
import { OnboardingStartComponent } from '../../routes/onboarding/onboarding-start/onboarding-start.component';
import {
  OnboardingGoalsTasksComponent
} from '../../routes/onboarding/onboarding-goals-tasks/onboarding-goals-tasks.component';

export const onboardingRoutes = {
  title: 'Onboarding',
  path: 'onboarding',
  component: OnboardingComponent,
  canActivate: [LoggedInGuard],
  children: [
    {
      path: 'start',
      component: OnboardingStartComponent,
    },
    {
      title: 'Onboarding | Goals',
      path: 'goals-tasks',
      component: OnboardingGoalsTasksComponent,
    },
  ],
}
