import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  contentName: string;
  selectedLanguages: string[] = [];
  selectedThemes: string[] = [];
  ageGroup: number;
  contentLink: string;
  description: string;
  selectedCompetency: string[] = [];

  languages: string[] = ['English', 'Hindi', 'Gujarati', 'Assamese', 'Tamil', 'Marathi', 'Kannada'];
  themes: string[] = ['Animals', 'Birds', 'Vegetables', 'Nature', 'Relations'];
  contentType: string[] = ['Video', 'Read Along', 'Read', 'Audio', 'Sign Language'];
  competency: string[] = ['Competency A', 'Competency B', 'Competency C'];
  routeEnabled: boolean = false;

  constructor(private route: ActivatedRoute) { }
  data: string;

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.data = queryParams['data'];
      if (this.data) {
        this.selectedCompetency.push(this.data)
        this.routeEnabled = true;
      }
      console.log(this.selectedCompetency)
    });

  }
}
