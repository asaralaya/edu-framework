import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-explore-content',
  templateUrl: './explore-content.component.html',
  styleUrls: ['./explore-content.component.scss']
})
export class ExploreContentComponent implements OnInit {

  theme = '';
  language = '';
  type = '';

  source = [{
    id: 1,
    title: "छोटे हाथ बड़े काम - रोटी बनाना",
    description: "Making the roti - Life skill , Motor skills",
    type: "Video",
    theme: "Home Activities",
    icon: "../../../assets/icons/The chicks fear.png",
    language: "Hindi",
    url: "https://www.prathamopenschool.org/catalog/ResourceView/9082",
    source: "Pratham",
    age: "3-6 Years"
  },
  {
    id: 2,
    title: "छोटे हाथ बड़े काम - मटर छिलना",
    description: "Shelling Peas - Motor Skills",
    icon: "../../../assets/icons/jackal-drum.png",
    type: "Video",
    theme: "Home Activities",
    language: "Hindi",
    url: "https://www.prathamopenschool.org/catalog/ResourceView/9085",
    source: "Pratham",
    age: "3-6 Years"
  },
  {
    id: 3,
    title: "रंगों की पहचान",
    description: "Colour recognition helps children develop cognitive abilities such as recognition, differentiation, classification and categorization which are important for math concepts at later stages.",
    icon: "../../../assets/icons/Riya_s umbrella.png",
    type: "Video",
    theme: "Home Activities",
    language: "Hindi",
    url: "https://www.prathamopenschool.org/catalog/ResourceView/9084",
    source: "Pratham",
    age: "3-6 Years"
  },
  {
    id: 4,
    title: "शरबत बनाना",
    description: "Making Sherbet - Sorting, Mixing, Life skill",
    type: "Video",
    icon: "../../../assets/icons/kachkach.png",
    theme: "Home Activities",
    language: "Hindi",
    url: "https://www.prathamopenschool.org/catalog/ResourceView/9088",
    source: "Pratham",
    age: "3-6 Years"
  },
  {
    id: 5,
    title: "Vegetables",
    description: "Learning through stories using familiar objects",
    type: "Audio",
    icon: "../../../assets/icons/MangoTree.png",
    theme: "Home Activities",
    language: "Hindi",
    url: "https://drive.google.com/file/d/1XtEHlniFu-KipjCNTr9wlWgqLNn0_n3H/view?usp=drive_link",
    source: "Dost Education",
    age: "3-6 Years"
  },
  {
    id: 6,
    title: "Learn through play",
    description: "Learn through play",
    type: "Audio",
    icon: "../../../assets/icons/aloomaloo.png",
    theme: "Home Activities",
    language: "Hindi",
    url: "https://drive.google.com/file/d/1h8R-I7U06z3rmrYe2rGJTig0ITZbOHXI/view?usp=drive_link",
    source: "Dost Education",
    age: "3-6 Years"
  },

  ]

  data = this.source
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  themeChange() {
    this.data = this.source.filter((item) => {
      return (this.language && this.type) ? (item.theme === this.theme && item.language === this.language && item.type === this.type) : (this.language && !this.type) ? (item.language === this.language && item.theme === this.theme) : (!this.language && this.type) ? (item.type === this.type && item.theme === this.theme) : item.theme === this.theme;
    })
  }

  languageChange() {
    this.data = this.source.filter((item) => {
      return (this.theme && this.type) ? (item.theme === this.theme && item.language === this.language && item.type === this.type) : (this.type && !this.theme) ? (item.type === this.type && item.language === this.language) : (!this.type && this.theme) ? (item.theme === this.theme && item.language === this.language) : item.language === this.language;
    })
  }

  typeChange() {
    this.data = this.source.filter((item) => {
      return (this.theme && this.language) ? (item.theme === this.theme && item.language === this.language && item.type === this.type) : (this.language && !this.theme) ? (item.language === this.language && item.type === this.type) : (!this.language && this.theme) ? (item.theme === this.theme && item.type === this.type) : item.type === this.type;
    })
  }

  clicked() {
    this.language = '';
    this.theme = ''
    this.type = ''
    this.data = this.source
  }
  openDialog(val: any): void {
    let data = this.source[val - 1]

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog/dialog.component.html',
  styleUrls: ['../dialog/dialog.component.scss']

})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigate(url: any) {
    window.open(url)
  }
}

