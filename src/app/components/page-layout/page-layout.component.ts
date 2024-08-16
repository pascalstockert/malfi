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
    public router: Router,
    private authService: AuthService,
  ) {
  }

  public async signOut(): Promise<void> {
    console.log(this.router.url);
    await this.authService.signOut();
    await this.router.navigate(['/auth/login']);
  }
}
