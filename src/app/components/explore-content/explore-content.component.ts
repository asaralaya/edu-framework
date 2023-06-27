import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';

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
    age: "4 Year"
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
    age: "5 Year"
  },
  {
    id: 7,
    title: "কুকুৰা পোৱালিৰ ভয় (The chicks fear)",
    description: "Why did the chicks get scared? Who is it that they are afraid of? Read more to find out.",
    type: "Video",
    icon: "../../../assets/icons/The chicks fear.png",
    theme: "Birds",
    language: "Assamese",
    url: "https://www.prathamyouthnet.org/story/packs/video.php?nodeid=d91d18a1-d30f-47c9-829b-90bfdee14a79&parentnode=e5672698-aa2c-4eb7-a149-54b82ab247b7",
    source: "Pratham",
    age: "3-4 yrs"
  },
  {
    id: 8,
    title: "Jackal and the Drum",
    description: "This story ia about a hungry jackal. He goes in search of food, then he suddenly hears the sound of a drum. Listen to the story to see what happens next.",
    type: "Read Along",
    icon: "../../../assets/icons/jackal-drum.png",
    theme: "Animals",
    language: "English",
    url: "https://diksha.gov.in/play/content/do_31381695158648012811422",
    source: "DIKSHA",
    age: "6 Year"
  },
  {
    id: 9,
    title: "என் நண்பர்கள் (My Friends)",
    description: "I have many friends. Love them all. But only one of them is the best.",
    type: "Read",
    icon: "../../../assets/icons/aloomaloo.png",
    theme: "Relations",
    language: "Tamil",
    url: "https://storyweaver.org.in/stories/378-en-nanbargal",
    source: "Storyweaver",
    age: "5 Year"
  },
  {
    id: 10,
    title: "0 के बारे में जानना",
    description: "Learning numbers through food",
    type: "Video",
    icon: "../../../assets/icons/jackal-drum.png",
    theme: "Numbers",
    language: "Hindi",
    url: "https://diksha.gov.in/play/content/do_3133929724387573761320",
    source: "Rocket Learning",
    age: "6 yrs"
  },
  {
    id: 11,
    title: "10-20 संख्याओं को अलग करके लिखना",
    description: "Differentiating numbers through objects",
    type: "Video",
    icon: "../../../assets/icons/kachkach.png",
    theme: "Numbers",
    language: "Hindi",
    url: "https://diksha.gov.in/play/content/do_3133930730444390401645",
    source: "Rocket Learning",
    age: "6 yrs"
  }
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



