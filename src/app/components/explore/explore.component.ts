import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {


  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: any) {

  }
  goToHome() {
    location.href = '/home';
  }

}

