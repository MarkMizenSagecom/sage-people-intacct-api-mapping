import { Component, Input } from '@angular/core';
import { ApiProperty } from '../../../../store/models';

@Component({
  selector: 'amt-property-list-item',
  template: `
    <div class="amt-property-list-item">
      {{ property?.name }}
      <span *ngIf="property?.type">({{ property?.type }})</span>
      <amt-add-relationship  *ngIf="showAdd" (add)="addRelationship($event)"></amt-add-relationship>
    </div>
  `,
  styleUrls: ['./property-list-item.component.less']
})
export class PropertyListItenComponent {
  @Input() property: ApiProperty;
  @Input() showAdd: boolean = false;

  addRelationship(event){
    console.log(this.property)
  }
}
