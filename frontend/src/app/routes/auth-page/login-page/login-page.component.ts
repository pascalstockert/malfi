import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { PageLayoutComponent } from '../../../components/page-layout/page-layout.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PageLayoutComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
  ) {}

  async loginWithGoogle(): Promise<void> {
    await this.authService.signInWithGoogle();
  }
}
