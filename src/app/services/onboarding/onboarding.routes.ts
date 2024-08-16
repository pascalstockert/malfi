import { OnboardingComponent } from '../../routes/onboarding/onboarding.component';
import { LoggedInGuard } from '../../guards/logged-in/logged-in.guard';
import { OnboardingStartComponent } from '../../routes/onboarding/onboarding-start/onboarding-start.component';
import {
  OnboardingGoalsTasksComponent
} from '../../routes/onboarding/onboarding-goals-tasks/onboarding-goals-tasks.component';
import {
  OnboardingIntentionsComponent
} from '../../routes/onboarding/onboarding-intentions/onboarding-intentions.component';
import { OnboardingCalendarComponent } from '../../routes/onboarding/onboarding-calendar/onboarding-calendar.component';
import { OnboardingEndComponent } from '../../routes/onboarding/onboarding-end/onboarding-end.component';

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
      title: 'Onboarding | Goals & Tasks',
      path: 'goals-tasks',
      component: OnboardingGoalsTasksComponent,
    },
    {
      title: 'Onboarding | Intentions',
      path: 'intentions',
      component: OnboardingIntentionsComponent,
    },
    {
      title: 'Onboarding | Calendar',
      path: 'calendar',
      component: OnboardingCalendarComponent,
    },
    {
      title: 'Onboarding',
      path: 'end',
      component: OnboardingEndComponent,
    },
  ],
}
