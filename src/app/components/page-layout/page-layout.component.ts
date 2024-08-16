import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public async signOut(): Promise<void> {
    await this.authService.signOut();
    await this.router.navigate(['/auth/login']);
  }
}
