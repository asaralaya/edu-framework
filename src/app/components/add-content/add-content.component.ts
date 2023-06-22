import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  contentName:string;
  selectedLanguages: string[] = [];
  selectedThemes: string[] = [];
  contentType: string;
  ageGroup: number;
  contentLink: string;
  description: string;
  selectedSuggestedCompetencies: string[] = [];
  selectedAllCompetencies: string[] = [];

  languages: string[] = ['English','Hindi','Gujarati','Assamese','Tamil','Marathi','Kannada'];
  themes: string[] = ['Animals','Birds','Vegetables','Nature','Relations'];
  suggestedCompetencies: string[] = ['Competency 1', 'Competency 2', 'Competency 3'];
  allCompetencies: string[] = ['Competency A', 'Competency B', 'Competency C'];

  constructor() { }

  ngOnInit(): void {
  }

}
