import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiProperty } from '../../../../models';

@Component({
  selector: 'amt-property-list-item',
  template: `
    <div class="amt-property-list-item" [ngClass]="property?.state" *ngIf="property?.name else group">
      <div
        class="amt-property-list-item__inner"
        role="button"
        z-index="0"
        (click)="$event.stopPropagation();clickedItem()"
        [title]="property?.niceName || property?.name"
      >
        {{ property?.name }}
        <span class="amt-property-list-item__data-type" *ngIf="property?.type">({{ property?.type }})</span>
      </div>
      <amt-add-relationship *ngIf="showAdd" [pressed]="property?.state === 'selected'" (add)="clickedItem('add')"></amt-add-relationship>
      <amt-remove-relationship *ngIf="showRemove" (remove)="clickedItem('remove')"></amt-remove-relationship>
    </div>

    <ng-template #group>
      <div class="amt-property-list-item amt-property-list-item--group">
        <div class="amt-property-list-item__inner">
          {{ property?.groupTitle }}
        </div>
      </div>
    </ng-template>

  `,
  styleUrls: ['./property-list-item.component.less']
})
export class PropertyListItenComponent {

  @Input() property: ApiProperty;

  @Input() showAdd: boolean = false;

  @Input() showRemove: boolean = false;

  @Output() clicked: EventEmitter<string> = new EventEmitter();

  clickedItem(event:string) {
    this.clicked.emit(event);
  }
}
