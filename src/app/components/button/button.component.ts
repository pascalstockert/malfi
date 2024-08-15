import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../modules/icons/icons.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'primary' | 'passive' | 'destructive' | 'disabled' = 'primary';
  @Input() icon: string | undefined;
  @Input() iconStrokeClass = 'stoke-2';
  @Input() onlyIcon = false;
  @Input() stretch: boolean = true;
}
