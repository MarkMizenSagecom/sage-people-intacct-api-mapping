import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amt-add-relationship',
  template: `
    <button class="amt-add-relationship" (click)="clickAdd($event)">
      <span class="sr-only">Add</span>
    </button>
  `,
  styleUrls: ['./add-relationship.component.less']
})
export class AddRelationshipComponent {
  @Output() add: EventEmitter<void> = new EventEmitter();

  clickAdd(event) {
    this.add.emit(event);
  }
}


