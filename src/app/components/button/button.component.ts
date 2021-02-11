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
  @Input() baseColor = colors.coral;

  @Input() border = 'none';

  @Input() textColor = colors.grey;
  @Input() fontWeight = 'bold';

  @Input() icon: IconProp;
  @Input() iconColor = colors.grey;
  @Input() text = 'Click';

  constructor() { }

  ngOnInit(): void {
  }

  emit( event: MouseEvent ) {
    this.click.emit( event );
  }

}
