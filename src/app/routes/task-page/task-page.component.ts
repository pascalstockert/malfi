import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, NgOptimizedImage],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  constructor(
    private router: Router,
  ) {}

  public async navigateToCreation(): Promise<void> {
    await this.router.navigate(['/task/create']);
  }
}
