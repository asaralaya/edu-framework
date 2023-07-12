import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core'
import { NSFramework } from '../../models/framework.model'
import { FrameworkService } from '../../services/framework.service'
import { CardSelection } from '../../models/variable-type.model';

@Component({
  selector: 'lib-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.scss']
})
export class TermCardComponent implements OnInit {

  private _data: NSFramework.ITermCard;
  isApprovalRequired: boolean = false
  @Input()
  set data(value: any) {
    this._data = value;
    this._data.children.highlight = false
  }
  get data(): any {
    return this._data;
  }

  @Output() isSelected = new EventEmitter<CardSelection>()
  @Output() lastCard = new EventEmitter<CardSelection>()

  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
  }

  cardClicked(data: any, cardRef: any) {
    this.isSelected.emit({ element: this.data.children, isSelected: !data.selected })
    this.frameworkService.currentSelection.next({ type: this.data.category, data: data.children, cardRef })
  }

  getColor(indexClass: number, cardRef: any, property: string, data: any) {
    if (property === 'border') {
      let borderColor;
      if (cardRef.classList.contains((indexClass).toString())) {
        borderColor = "8px solid black";
      }
      return borderColor;
    }
  }
}
