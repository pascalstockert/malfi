import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-page-router',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './task-page-router.component.html',
  styleUrl: './task-page-router.component.scss'
})
export class TaskPageRouterComponent {

}
