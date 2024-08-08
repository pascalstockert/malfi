import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-intention-page-router',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './intention-page-router.component.html',
  styleUrl: './intention-page-router.component.scss'
})
export class IntentionPageRouterComponent {

}
