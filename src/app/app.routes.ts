import { Routes } from '@angular/router';
import { AuthPageComponent } from './routes/auth-page/auth-page.component';
import { LoginPageComponent } from './routes/auth-page/login-page/login-page.component';
import { TaskPageComponent } from './routes/task-page/task-page.component';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { CreateTaskPageComponent } from './routes/task-page/create-task-page/create-task-page.component';
import { TaskPageRouterComponent } from './routes/task-page/task-page-router/task-page-router.component';
import {
  IntentionPageRouterComponent
} from './routes/intention-page/intention-page-router/intention-page-router.component';
import { IntentionPageComponent } from './routes/intention-page/intention-page.component';
import {
  CreateIntentionPageComponent
} from './routes/intention-page/create-intention-page/create-intention-page.component';
import { CalendarPageComponent } from './routes/calendar-page/calendar-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    title: 'Auth',
    path: 'auth',
    component: AuthPageComponent,
    canActivate: [LoggedOutGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
  {
    path: 'task',
    component: TaskPageRouterComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        title: 'Tasks',
        path: '',
        pathMatch: 'full',
        component: TaskPageComponent,
      },
      {
        title: 'Tasks | Create',
        path: 'create',
        component: CreateTaskPageComponent,
      }
    ]
  },
  {
    path: 'intention',
    component: IntentionPageRouterComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        title: 'Intentions',
        path: '',
        pathMatch: 'full',
        component: IntentionPageComponent,
      },
      {
        title: 'Intentions | Create',
        path: 'create',
        component: CreateIntentionPageComponent,
      }
    ]
  },
  {
    title: 'Calendar',
    path: 'calendar',
    component: CalendarPageComponent,
    canActivate: [LoggedInGuard],
  }
];
