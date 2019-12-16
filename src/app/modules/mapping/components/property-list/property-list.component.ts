import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amt-property-list',
  template: `
    <div class="amt-property-list">
      <h2>{{ title }}</h2>
      <div class="amt-property-list__wrap" *ngIf="properties">
        <amt-property-list-item
          *ngFor="let property of objectKeys(properties)"
          [property]="properties[property]"
          [showAdd]="lhs">
        </amt-property-list-item>
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

  @Output() add: EventEmitter<{event: any, index: number}> = new EventEmitter();
}
