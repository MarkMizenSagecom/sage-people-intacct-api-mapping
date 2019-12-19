import { Component, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList } from '@angular/core';

import * as fromModels from 'src/app/models';
import { PropertyListItemComponent } from '../property-list-item/property-list-item.component';

@Component({
  selector: 'amt-property-list',
  template: `
    <div class="amt-property-list">
      <h2>{{ title }}</h2>

      <div class="amt-property-list__wrap" *ngIf="properties">

        <ng-container *ngFor="let property of properties | keyvalue: orderByOrder; index as i">
          <ng-container *ngIf="property.value.category === null">
            <amt-property-list-item
              (clicked)="clickedAction(property.key, $event)"
              [property]="property.value"
              [key]="property.key"
              [showRemove]="showRemoveButton(property.key)"
              [showAdd]="lhs"></amt-property-list-item>
          </ng-container>
        </ng-container>

        <ng-container *ngFor="let category of categories | keyvalue: orderByOrder; index as i">

          <div class="amt-property-list__heading">
            {{ category.value.label }}
          </div>

          <ng-container
            *ngTemplateOutlet="categoryProperties;context:category.value"
          ></ng-container>

        </ng-container>

      </div>
    </div>

    <ng-template #categoryProperties let-cat="label">
      <ng-container *ngFor="let property of properties | keyvalue: orderByOrder; index as i">
        <ng-container *ngIf="property.value.category === cat">
          <amt-property-list-item
            [key]="property.key"
            (clicked)="clickedAction(property.key, $event)"
            [property]="property.value"
            [showRemove]="showRemoveButton(property.key)"
            [showAdd]="lhs"></amt-property-list-item>
        </ng-container>
      </ng-container>
    </ng-template>
  `,
  styleUrls: ['./property-list.component.less']
})
export class PropertyListComponent {

  @Input() relationships: fromModels.MappingRelationship[];

  @Input() properties: fromModels.MappingListData;

  @Input() categories: fromModels.MappingListCategories;

  @Input() title:string;

  @Input() lhs: boolean = false;

  // Passes up the click event on the properties
  @Output() clickedProperty: EventEmitter<[string, string, any]> = new EventEmitter();

  constructor(
    public element: ElementRef
  ){}

  // Orders the items by order property
  orderByOrder(a:any, b:any) {
    return a.value.order > b.value.order;
  }

  clickedAction(property: string, event: [string, any]) {
    const [action, nativeEvent] = event;
    this.clickedProperty.emit([property, action, nativeEvent]);
  }

  showRemoveButton(propertyID: string) {
    if (this.lhs || !this.relationships) return false;
    const matches = Object
      .entries(this.relationships)
      .filter((item)=> item[1].to === propertyID);
    return matches.length > 0;
  }
}
