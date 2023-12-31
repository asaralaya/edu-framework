import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';
import { ApprovalService } from '../../services/approval.service';
import { CardChecked, CardSelection, CardsCount, Card } from '../../models/variable-type.model';
declare var LeaderLine: any;
@Component({
  selector: 'lib-taxonomy-column-view',
  templateUrl: './taxonomy-column-view.component.html',
  styleUrls: ['./taxonomy-column-view.component.scss']
})
export class TaxonomyColumnViewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() column: Card;
  @Input() containerId: string
  connectorMapping: any = {}
  @Output() updateTaxonomyTerm = new EventEmitter<any>(true);
  @Output() updateTermList = new EventEmitter<CardChecked>();
  @Output() cardsCount = new EventEmitter<CardsCount>();
  columnData: Array<Card> = [];
  childSubscription: Subscription = null;
  newTermSubscription: Subscription = null;
  approvalTerm: any;
  termshafall: Array<Card> = [];
  constructor(
    private frameworkService: FrameworkService,
    private connectorService: ConnectorService,
    private approvalService : ApprovalService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {}


  ngOnInit(): void {
    this.subscribeEvents()

    if (this.column.index === 1) {
      this.approvalService.getUpdateList().subscribe((list:any) => {
        this.approvalTerm = list.filter(item => this.column.code === item.category)
        if(this.approvalTerm){
          this.approvalTerm.forEach((term, i)=> {
             this.column.children.forEach((lel,j) => {
                if(lel.identifier === term.identifier){
                  if(!this.isExists(term)){
                    this.termshafall.push(lel)
                  }
                }
             })
          })
          // this.termshafall = [...this.termshafall]
          this.column.children.forEach((tr, i) => {
            if(!this.isExists(tr)){
              this.termshafall.push(tr)
            }
          })
          this.columnData = this.termshafall;
          this.cardsCount.emit({category: this.columnData[0].category,count:this.columnData.length});
        }
      })
    }
    this.connectorMapping = this.connectorService.connectorMap
    // this.frameworkService.isDataUpdated.subscribe(() => {
    //   this.ngOnInit()
    // })
    
  }
 
  isExists(e){
    let temp;
    temp = this.termshafall.map(t => t.identifier)
    return temp.includes(e.identifier)
  }
  
  subscribeEvents() {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
    this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
      if (!e) {
        return
      } else if (e.type === this.column.code) {
        this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: e.data })
        this.columnData = (this.columnData || []).map(item => {
          if (item.code === e.data.code) {
            item.selected = true
          } else {
            //this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: e.data })
            item.selected = false
          }
          return item
        });
        this.setConnectors(e.cardRef, this.columnData, 'SINGLE')
        return
        // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
      } else {
        const next = this.frameworkService.getNextCategory(e.type);
        // // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
        if (next && next.code === this.column.code) {
          //   const back = this.frameworkService.getPreviousCategory(this.column.code)
          //   console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
          //   const localTerms = []
          //   this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
          // debugger
          //     const lst = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
          //     if (lst && f.parent.identifier === lst.identifier) {
          //       localTerms.push(f.term)
          //     }
          //   })
          //   // get last parent and filter Above

          //   this.columnData = [...localTerms, ...(e.data.children || [])]
          //     .filter(x => {
          //       return x.category == this.column.code
          //     }).map(mer => {
          //       //**read local children for next */
          //       // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
          //       // console.log("Saved ======================+>", nextChildren)
          //       /**reset Next level children */
          //       // this.column.children = this.column.children.map(col => { col.selected = false; return col })
          //       // mer.selected = false
          //       mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
          //       return mer
          //     })
          //   // this.updateTerms()
          setTimeout(() => {
            this.setConnectors(e.cardRef, next && next.index < this.column.index ? [] : this.columnData, 'ALL')
          }, 100);
          // console.log(this.columnData)
        }

        if (next && next.index < this.column.index) {
          this.columnData = [];
        }
      }
    })
    if (this.newTermSubscription) {
      this.newTermSubscription.unsubscribe()
    }
    this.newTermSubscription = this.frameworkService.insertUpdateDeleteNotifier.subscribe(e => {
      if (e && e.action) {
        const next = this.frameworkService.getNextCategory(e.action);
        if(next?.code)
        {if (this.column.code === next.code && e.type === 'select') {
          this.insertUpdateHandler(e, next)
        }}
      }
    })
  }
  insertUpdateHandler(e, next) {
    const back = this.frameworkService.getPreviousCategory(this.column.code)
    // console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
    const localTerms = []
    this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
      const selectedParent = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
      if (selectedParent && ((f.parent.code === selectedParent.code) || (f.parent.identifier && (f.parent.identifier === selectedParent.identifier)))) {
        localTerms.push(f.term)
      }
    })
    // get last parent and filter Above
    this.columnData = [...localTerms, ...(e.data.children || [])]
      .filter(x => {
        return x.category == this.column.code
      }).map(mer => {
        //**read local children for next */
        // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
        // console.log("Saved ======================+>", nextChildren)
        /**reset Next level children */
        this.column.children = this.column.children.map(col => { col.selected = false; return col })
        mer.selected = false
        mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
        return mer
      });

    if(this.columnData.length > 0) {
      this.cardsCount.emit({category: this.columnData[0].category,count:this.columnData.length});
    } else {
      this.cardsCount.emit({category: this.column.code,count: 0});
    }
    // this.updateTerms()

    // console.log(this.columnData)



  }
  updateSelection1(data: any) {
//console.log(data)
   }

   getLastCard(data:any){
    this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: data.element,lastNode:true })
   }
  updateSelection(selection: any) {
    // console.log(selection.element.code, selection.isSelected)
    // if(this.column.code==='medium'){
    // console.log( this.column.children)
    // }
    // if (selection.element.category === this.column.code) {
    //   this.updateTaxonomyTerm.emit({ isSelected: selection.isSelected, selectedTerm: selection.element })
    // }
    // this.column.children = this.column.children.map(col => {
    //   if (col.code === selection.element.code) {
    //     col.selected = true
    //   } else {
    //     col.selected = false
    //   }
    //   return col
    // })
    console.log(selection)
  }

  get columnItems() {
    // const selected = this.column.children.filter(f => { return f.selected })
    // if (selected.length > 0) {
    //   const data = this.columnData.map(cd => {
    //     cd.selected = this.column.children.filter(f => { return cd.identifier === f.identifier }).map(s => s.selected)[0]
    //     return cd
    //   })
    //   return data
    // } else {
    return this.columnData
    // }
  }

  setConnectors(elementClicked, columnItem, mode) {
    this.removeConnectors(elementClicked, 'box' + (this.column.index - 1), this.column.index - 1)
    // console.log('mode', mode)
    // console.log('child ', columnItem)
    // console.log('elementClicked', elementClicked)
    // console.log('connectorMapping', this.connectorMapping)
    if (mode === 'ALL') {
      // let tempconnectorMapping = {}
      // this.connectorService.updateConnectorsMap(tempconnectorMapping)
      // {
      //   ['column' + (this.column.index- 1)]: ''

      // }
      const ids = columnItem.map((c, i) => {
        return this.column.code + 'Card' + (i + 1)
      })
      this.connectorMapping['box' + (this.column.index - 1)] = { source: elementClicked, lines: (ids || []).map(id => { return { target: id, line: '', targetType: 'id' } }) }
      this.connectorService.updateConnectorsMap(this.connectorMapping)
      // console.log('next', next)
      const connectionLines = this.connectorService._drawLine(
        this.connectorMapping['box' + (this.column.index - 1)].source,
        this.connectorMapping['box' + (this.column.index - 1)].lines,
        null,
        '#box' + (this.column.index - 1),
        '#box' + this.column.index
      )
      this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
      // console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
      // if (cat.code === 'board') {
      //   this.connectorService._drawLine('box0card0', this.connectorMapping['board']['box0card0'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'medium') {
      //   this.connectorService._drawLine('box1card1', this.connectorMapping['medium']['box1card1'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'gradeLevel') {
      //   this.connectorService._drawLine('box2card7', this.connectorMapping['grade']['box2card7'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
    } else {
      // console.log('inside else')
      // console.log('this.column', this.column)
      const item = this.column.children.findIndex(c => c.selected) + 1
      if (this.column.index > 1) {
        this.connectorMapping['box' + (this.column.index - 1)].lines = [{ target: elementClicked, line: '', targetType: 'element' }]

        this.connectorService.updateConnectorsMap(this.connectorMapping)
        const connectionLines = this.connectorService._drawLine(
          this.connectorMapping['box' + (this.column.index - 1)].source,
          this.connectorMapping['box' + (this.column.index - 1)].lines,
          null,
          '#box' + (this.column.index - 1),
          '#box' + this.column.index
        )
        this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
        // console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
      }

    }
    this.connectorService.updateConnectorsMap(this.connectorMapping)

  }
  removeConnectors(currentElement, prevCol, currentIndex) {
    if (this.connectorMapping) {
      for (const key in this.connectorMapping) {
        // Remove all n-1 lines and keep only current selection, also clear n+1 lines
        if (this.connectorMapping[key] && this.connectorMapping[key].lines && this.connectorMapping[key].lines.length > 0) {
          const lines = this.connectorMapping[key].lines
          lines.forEach(async (element, index) => {
            if (element != currentElement && prevCol == key) {
              await element.line && element.line.remove();
              lines.splice(index, 1);
            }
          });
          this.connectorMapping[key].lines = lines
        }

        // remove all n+2 lines, if clicks previous columns and tree was already drilled down
        let count = currentIndex + 2;
        let nextCol = `box${count}`
        if (this.connectorMapping[nextCol] && this.connectorMapping[nextCol].lines && this.connectorMapping[nextCol].lines.length > 0) {
          const lines = this.connectorMapping[nextCol].lines
          lines.forEach(async (element, index) => {
            await element.line && element.line.remove();
            lines.splice(index, 1);
          })
          this.connectorMapping[nextCol].lines = null
        }
      }

    }
  }
  selectedCard(event){
    console.log('sdsdd',event)
    this.updateTermList.emit(event);
  }

  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }
  
}