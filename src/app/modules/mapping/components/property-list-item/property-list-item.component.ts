import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from 'src/app/models';

@Component({
  selector: 'amt-property-list-item',
  template: `
    <div class="amt-property-list-item" [ngClass]="property?.state">
      <button
        class="amt-property-list-item__inner"
        (click)="$event.stopPropagation();clickedItem(null, $event)"
        [title]="property?.label"
        role="button"
        z-index="0"
      >
        {{ property?.label }}
        <span class="amt-property-list-item__data-type" *ngIf="property?.type">({{ property?.type }})</span>
      </button>
      <amt-add-relationship *ngIf="showAdd" [pressed]="property?.state === 'selected'" (add)="clickedItem('add', $event)"></amt-add-relationship>
      <amt-remove-relationship *ngIf="showRemove" (remove)="clickedItem('remove', $event)"></amt-remove-relationship>
    </div>
  `,
  styleUrls: ['./property-list-item.component.less']
})
export class PropertyListItemComponent{

  @Input() property: fromModels.MappingItem;

  @Input('key') id: string;

  @Input() showAdd: boolean = false;

  @Input() showRemove: boolean = false;

  @Output() clicked: EventEmitter<[string, any]> = new EventEmitter();


  clickedItem(action:string, nativeEvent: any) {
    if (this.property.state !== 'disabled'){
      this.clicked.emit([action, nativeEvent]);
    }
  }

}
