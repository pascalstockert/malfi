import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { colors } from "../../vars";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() click = new EventEmitter<MouseEvent>();

  @Input() rounded = false;
  @Input() baseColor = colors.light;

  @Input() border = 'none';

  @Input() textColor = colors.dark;
  @Input() fontWeight = 'bold';

  @Input() icon: IconProp;
  @Input() iconColor = colors.dark;
  @Input() text = 'Click';

  constructor() { }

  ngOnInit(): void {
  }

  emit( event: MouseEvent ) {
    this.click.emit( event );
  }

}
