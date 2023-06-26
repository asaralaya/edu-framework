import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { FRAMEWORK } from '../../constants/data'
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  contentName: string;
  selectedLanguages: string[] = [];
  selectedTheme: string;
  ageGroup: number;
  contentLink: string;
  description: string;
  selectedCompetency: string[] = [];
  selectedType: string;

  languages: string[] = ['English', 'Hindi', 'Gujarati', 'Assamese', 'Tamil', 'Marathi', 'Kannada'];
  themes: string[] = ['Animals', 'Birds', 'Vegetables', 'Nature', 'Relations'];
  contentType: string[] = ['Video', 'Read Along', 'Read', 'Audio', 'Sign Language'];
  competency = FRAMEWORK.result.framework.categories[2].terms.map(function (value) {
    return value.name;
  });
  routeEnabled: boolean = false;
  responseData: string = '';
  showLoader: boolean = false;
  errorData: boolean = false;
  ol: boolean = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, public dialog: MatDialog) { }
  data: string;

  ngOnInit() {
    // this.route.queryParams.subscribe(queryParams => {
    //   this.data = queryParams['data'];
    //   if (this.data) {
    //     this.selectedCompetency.push(this.data)
    //     this.routeEnabled = true;
    //   }
    // });
  }

  fetchCompetency() {
    this.showLoader = true
    this.errorData = false

    let query = `Give me competencies in the form of unordered list that best suit for a content that has: ${this.description}`

    const params = {
      uuid_number: '4653c216-1033-11ee-8f12-0242ac110002',
      query_string: query
    };

    this.chatService.search(params).subscribe(
      (response: any) => {
        if (response.answer.indexOf('\n\n1')) {
          let data = response.answer.replaceAll('\n\n', '\n').split('\n').slice(1);
          this.showLoader = false
          this.ol = true
          this.responseData = data;
        } else {
          let data = response.answer.replaceAll('\n', '').split('- ').slice(1)
          this.showLoader = false
          this.responseData = data;
        }
      },
      (error: any) => {
        this.errorData = true
        this.showLoader = false
      });
  }

  openDialog(): void {
    let data = { type: 'Submit', description: 'You have Successfully tagged your content!' };
console.log(data)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: data,
  
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
