import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../../../models';

@Component({
  selector: 'amt-property-list',
  template: `
    <div class="amt-property-list">
      <h2>{{ title }}</h2>
      <div class="amt-property-list__wrap" *ngIf="properties">
        <amt-property-list-item
          *ngFor="let property of properties | keyvalue: orderByIndex; index as i"
          (clicked)="clickedAction(property.key, $event)"
          [property]="property.value"
          [showRemove]="hasRelationships(property.key)"
          [showAdd]="lhs"></amt-property-list-item>
      </div>
    </div>
  `,
  styleUrls: ['./property-list.component.less']
})
export class PropertyListComponent {

  objectKeys = Object.keys;

  @Input() properties:string[];

  @Input() title:string;

  @Input() lhs: boolean = false;

  @Input() relationships: fromModels.ApiRelationship[];

  @Output() clickedProperty: EventEmitter<[fromModels.ApiProperty, string]> = new EventEmitter();

  orderByIndex(a:fromModels.ApiProperty, b:fromModels.ApiProperty) {
    return a.index > b.index;
  }

  clickedAction(property: fromModels.ApiProperty, action = '') {
    this.clickedProperty.emit([property, action])
  }

  hasRelationships(propertyID: string) {

    if (this.lhs || !this.relationships) return false;

    const matches = Object
      .entries(this.relationships)
      .filter((item)=> item[1].to === propertyID);

    return matches.length > 0;
  }

}
