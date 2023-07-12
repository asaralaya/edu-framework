import { Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';
import { defaultConfig, headerLineConfig } from '../../constants/app-constant';
import {  Card } from '../../models/variable-type.model';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

declare var LeaderLine: any;
@Component({
  selector: 'lib-taxonomy-view',
  templateUrl: './taxonomy-view.component.html',
  styleUrls: ['./taxonomy-view.component.scss'],
  providers: [ConnectorService]
})
export class TaxonomyViewComponent implements OnInit, OnDestroy {
  @Input() approvalList: Array<Card> = [];
  @Input() isApprovalView: boolean = false;
  @Input() workFlowStatus: string;
  @Output() sentForApprove = new EventEmitter<any>()
  mapping = {};
  heightLighted = []
  localList = []
  showPublish: boolean = false
  newTermSubscription: Subscription = null
  loaded: any = {}
  showActionBar: boolean = false
  approvalRequiredTerms = []
  draftTerms: Array<Card> = [];
  isLoading: boolean = false;
  categoryList: any = [];
  nodeDescription: String = '';
  nodeType: any;
  learningList = []
  responseData: string;
  showLoader: boolean = false;
  nodeCompetency: any = '';
  errorData: boolean=false;
  ol: boolean = false;

  constructor(private frameworkService: FrameworkService,
    public dialog: MatDialog,
    private connectorSvc: ConnectorService,
    private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.init()

    this.showActionBar = this.isApprovalView ? true : false;

  }
  ngOnChanges() {
    this.draftTerms = this.approvalList;
  }
  init() {

    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.connectorSvc.removeAllLines()
      this.frameworkService.categoriesHash.value.forEach((cat: any) => {
        this.loaded[cat.code] = true
      })
      this.isLoading = false
      setTimeout(() => {
        this.drawHeaderLine(res.result.framework.categories.length);
      }, 500)
    })

  }


  updateTaxonomyTerm(data: { selectedTerm: any, isSelected: boolean, lastNode?: boolean }) {
    if (data.selectedTerm?.category === 'competency') {
      this.nodeType = 'leaf'
      this.learningList = data.selectedTerm.children;
      this.nodeCompetency = data.selectedTerm.name;
      this.responseData=''
    } else {
      this.nodeType = 'normal'

    }
    this.nodeDescription = data.selectedTerm.description
    if (!data.lastNode) {

      this.updateFinalList(data)
      this.updateSelection(data.selectedTerm.category, data.selectedTerm.code)

    }
  }
  updateSelection(category: string, selectedTermCode: string) {
    this.frameworkService.list.get(category).children.map(item => {
      item.selected = selectedTermCode === item.code ? true : false
      return item
    })
  }

  //need to refactor at heigh level
  updateFinalList(data: { selectedTerm: any, isSelected: boolean, parentData?: any, colIndex?: any }) {
    if (data.isSelected) {
      this.frameworkService.selectionList.set(data.selectedTerm.category, data.selectedTerm)
      const next = this.frameworkService.getNextCategory(data.selectedTerm.category)
      if (next && next.code) {
        this.frameworkService.selectionList.delete(next.code)
      }
      // notify next
      this.frameworkService.insertUpdateDeleteNotifier.next({ action: data.selectedTerm.category, type: 'select', data: data.selectedTerm })
    }
    if (data.colIndex === 0 && !data.isSelected) {
      this.isLoading = true;
      setTimeout(() => {
        this.init()
      }, 3000)
    }

    setTimeout(() => {
      this.loaded[data.selectedTerm.category] = true
    }, 100);

  }
  isEnabled(columnCode: string): boolean {
    return !!this.frameworkService.selectionList.get(columnCode)
  }

  get list(): any[] {
    return Array.from(this.frameworkService.list.values())
  }

  drawHeaderLine(len: number) {
    const options = { ...defaultConfig, ...headerLineConfig }
    for (let i = 1; i <= len; i++) {
      const startEle = document.querySelector(`#box${i}count`)
      const endEle = document.querySelector(`#box${i}Header`)
      if (startEle && endEle) {
        new LeaderLine(startEle, endEle, options);
      }
    }
  }

  getColumn(columnCode: string) {
    return this.frameworkService.list.get(columnCode)
  }

  getNoOfCards(event: any) {
    if (this.categoryList.length > 0 && event.category !== '') {
      let index = this.categoryList.findIndex((obj: any) => obj.category == event.category);
      if (index > -1) {
        this.categoryList.splice(index);
      }
    }
    if (event.category == '') {
      this.categoryList[this.categoryList.length - 1].count = 0;
    }
    this.categoryList.push(event);
  }

  closeActionBar(e) {
    this.showActionBar = false;
  }
  ngOnDestroy() {
    this.connectorSvc.removeAllLines()
  }
  navigateToRoute(): void {
    const data = this.nodeCompetency;
    this.router.navigate(['content'], { queryParams: { data } });
  }
  suggestActivity(){
    this.showLoader = true
    this.errorData = false
    let query = `Suggest best three activities that I can do  related to - ${this.nodeCompetency}`

    const params = {
      uuid_number: '4653c216-1033-11ee-8f12-0242ac110002',
      query_string: query
    };

    this.chatService.search(params).subscribe(
      (response: any) => {
        if (response.answer.indexOf('\n\n1')) {
          let data = response.answer.replaceAll('\n\n', '\n').split('\n');
          this.showLoader = false
          this.ol = true
          this.responseData = data;
          console.log('1',this.responseData)
        } else {
          let data = response.answer.replaceAll('\n', '').split('- ');
          this.showLoader = false
          this.responseData = data;
          console.log('2',this.responseData)

        }
      },
      (error: any) => {
        this.errorData = true
        this.showLoader = false
      });
  }
}
