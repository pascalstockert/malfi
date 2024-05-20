import { Routes } from '@angular/router';
import { AuthPageComponent } from './routes/auth-page/auth-page.component';
import { RegisterPageComponent } from './routes/auth-page/register-page/register-page.component';
import { LoginPageComponent } from './routes/auth-page/login-page/login-page.component';

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
];
