import { Component, OnInit } from '@angular/core';
import { ListService } from "../../services/list.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor( listService: ListService ) {
    listService.init();
  }

  ngOnInit(): void {
  }

}
