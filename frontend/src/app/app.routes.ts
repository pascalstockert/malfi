import { Routes } from '@angular/router';
import { AuthPageComponent } from './routes/auth-page/auth-page.component';
import { RegisterPageComponent } from './routes/auth-page/register-page/register-page.component';
import { LoginPageComponent } from './routes/auth-page/login-page/login-page.component';
import { TaskPageComponent } from './routes/task-page/task-page.component';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';

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
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
  {
    title: 'Task',
    path: 'task',
    component: TaskPageComponent,
    canActivate: [LoggedInGuard],
  }
];
