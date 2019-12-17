import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'amt-add-relationship',
  template: `
    <button
      class="amt-add-relationship"
      [ngClass]="{'_pressed':pressed}"
      (click)="$event.stopPropagation();clickAdd($event)"
      [title]="tooltip">
      <span class="sr-only">Add</span>
    </button>
  `,
  styleUrls: ['./change-relationship.component.less']
})
export class AddRelationshipComponent {

  @Input() pressed = false;

  @Output() add: EventEmitter<void> = new EventEmitter();

  get tooltip(){
    if (this.pressed){
      return "Cancel";
    } else {
      return "Click to add relationship";
    }
  }

  clickAdd(event) {
    this.add.emit(event);
  }
}



@Component({
  selector: 'amt-remove-relationship',
  template: `
    <button class="amt-remove-relationship" title="Remove relationship" (click)="$event.stopPropagation();clickRemove($event)">
      <span class="sr-only">Remove</span>
    </button>
  `,
  styleUrls: ['./change-relationship.component.less']
})
export class RemoveRelationshipComponent {
  @Output() remove: EventEmitter<void> = new EventEmitter();

  clickRemove(event) {
    this.remove.emit(event);
  }
}


