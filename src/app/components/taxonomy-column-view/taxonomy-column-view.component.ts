import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';
import { ListService } from '../../services/list.service';
import { CardChecked, Card } from '../../models/variable-type.model';
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
  columnData: Array<Card> = [];
  childSubscription: Subscription = null;
  newTermSubscription: Subscription = null;
  approvalTerm: any;
  termshafall: Array<Card> = [];
  constructor(
    private frameworkService: FrameworkService,
    private connectorService: ConnectorService,
    private listService: ListService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.subscribeEvents()

    if (this.column.index === 1) {
      this.listService.getUpdateList().subscribe((list: any) => {
        this.approvalTerm = list.filter(item => this.column.code === item.category)
        if (this.approvalTerm) {
          this.approvalTerm.forEach((term, i) => {
            this.column.children.forEach((lel, j) => {
              if (lel.identifier === term.identifier) {
                if (!this.isExists(term)) {
                  this.termshafall.push(lel)
                }
              }
            })
          })
          this.column.children.forEach((tr, i) => {
            if (!this.isExists(tr)) {
              this.termshafall.push(tr)
            }
          })
          this.columnData = this.termshafall;
        }
      })
    }
    this.connectorMapping = this.connectorService.connectorMap
  }

  isExists(e) {
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
            item.selected = false
          }
          return item
        });
        this.setConnectors(e.cardRef, this.columnData, 'SINGLE')
        return
      } else {
        const next = this.frameworkService.getNextCategory(e.type);
        if (next && next.code === this.column.code) {
          setTimeout(() => {
            this.setConnectors(e.cardRef, next && next.index < this.column.index ? [] : this.columnData, 'ALL')
          }, 100);
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
        if (next?.code) {
          if (this.column.code === next.code && e.type === 'select') {
            this.insertUpdateHandler(e, next)
          }
        }
      }
    })
  }
  insertUpdateHandler(e, next) {
    const back = this.frameworkService.getPreviousCategory(this.column.code)
    const localTerms = []

    // get last parent and filter Above
    this.columnData = [...localTerms, ...(e.data.children || [])]
      .filter(x => {
        return x.category == this.column.code
      }).map(mer => {
        this.column.children = this.column.children.map(col => { col.selected = false; return col })
        mer.selected = false
        mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
        return mer
      });


  }
  updateSelection1(data: any) {
    //console.log(data)
  }

  getLastCard(data: any) {
    this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: data.element, lastNode: true })
  }

  get columnItems() {
    return this.columnData
  }

  setConnectors(elementClicked, columnItem, mode) {
    this.removeConnectors(elementClicked, 'box' + (this.column.index - 1), this.column.index - 1)

    if (mode === 'ALL') {
      const ids = columnItem.map((c, i) => {
        return this.column.code + 'Card' + (i + 1)
      })
      this.connectorMapping['box' + (this.column.index - 1)] = { source: elementClicked, lines: (ids || []).map(id => { return { target: id, line: '', targetType: 'id' } }) }
      this.connectorService.updateConnectorsMap(this.connectorMapping)
      const connectionLines = this.connectorService._drawLine(
        this.connectorMapping['box' + (this.column.index - 1)].source,
        this.connectorMapping['box' + (this.column.index - 1)].lines,
        null,
        '#box' + (this.column.index - 1),
        '#box' + this.column.index
      )
      this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
    } else {
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
      }
    }
    this.connectorService.updateConnectorsMap(this.connectorMapping)

  }
  removeConnectors(currentElement, prevCol, currentIndex) {
    if (this.connectorMapping) {
      for (const key in this.connectorMapping) {
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
  selectedCard(event) {
    console.log('sdsdd', event)
    this.updateTermList.emit(event);
  }

  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }

}