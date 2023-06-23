import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchQuery: any;
  responseData: string = ''
  showLoader = false
  errorData: boolean = false
  showButton=false
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  }
  search() {
    this.showLoader = true
    this.errorData = false
    this.responseData = ''
    const params = {
      uuid_number: '4653c216-1033-11ee-8f12-0242ac110002',
      query_string: this.searchQuery
    };
    this.chatService.search(params).subscribe(
      (response: any) => {
        if (response) this.showLoader = false
        this.searchQuery = ''
        this.responseData = response.answer;
        this.showButton=true
      },
      (error: any) => {
        this.errorData = true
        this.showLoader = false
        this.searchQuery = '';
        this.showButton=true

      });
  }

  gotoBot() {
    window.open("https://t.me/NCFFSHelperBot");
  }
}
