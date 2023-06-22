import { Component, OnInit } from '@angular/core';
import { inject } from "@vercel/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'edu-framework';
  ngOnInit(){
    inject()
  }
}
