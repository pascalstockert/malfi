import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './collapsible.component.html',
  styleUrl: './collapsible.component.scss'
})
export class CollapsibleComponent {
  @Input() title: string = '';

  @ViewChild('collapsibleContainer')
  collapsibleContainer: ElementRef<HTMLDivElement> | undefined;

  collapsed = true;

  constructor() {}

  toggleCollapsedState(): void {
    this.collapsed = !this.collapsed;

    if (this.collapsed) {
      this.collapseContainer();
    } else {
      this.showContainer();
    }
  }

  collapseContainer(): void {
    if (this.collapsibleContainer) {
      this.collapsibleContainer.nativeElement.style.height = '0px';
    }
  }

  showContainer(): void {
    if (this.collapsibleContainer) {
      this.collapsibleContainer.nativeElement.style.height = `${this.collapsibleContainer.nativeElement.scrollHeight}px`;
      setTimeout(() => {
        (this.collapsibleContainer as ElementRef<HTMLDivElement>).nativeElement.style.height = '100%';
      }, 300);
    }
  }
}
