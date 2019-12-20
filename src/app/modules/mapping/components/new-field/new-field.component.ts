import { Output, Component, EventEmitter, ViewChild } from '@angular/core';

import * as fromModels from 'src/app/models';

@Component({
  selector: 'amt-new-field',
  template: `
    <div class="amt-new-field">
      <form *ngIf="editting else addNew" (submit)="submitNew($event)" autocomplete="off">
        <label>
          <span>Field ID</span>
          <input id="newFieldId" name="newFieldID" [(ngModel)]="name" required #firstField/>
        </label>
        <label>
          <span>Field Type</span>
          <select name="newFieldType" [(ngModel)]="type">
            <option>None</option>
            <option value="string">String</option>
            <option value="number">Number</option>
          </select>
        </label>
        <input type="submit" value="Add"/>
        <button (click)="cancel()">Cancel</button>
      </form>
      <ng-template #addNew>
        <button class="amt-new-field__button" (click)="clickedAddNew()"><amt-icon size="small" iconType="plus"></amt-icon>Add New</button>
      </ng-template>
    </div>
  `,
  styleUrls: ['./new-field.component.less']
})
export class NewFieldComponent {

  @Output() createNew: EventEmitter<any> = new EventEmitter();

  @ViewChild('firstField', {static: false}) firstField;

  editting = false;

  name: string = '';
  type: 'number' | 'string' = null;

  clickedAddNew() {
    this.editting = true;
    requestAnimationFrame(()=>{
      this.firstField.nativeElement.focus();
    });
  }

  submitNew(event: any) {
    event.preventDefault();

    this.createNew.emit({
      index: null,
      id: this.name,
      name: this.name,
      type: this.type
    });

    this._reset();
  }

  cancel(){
    this._reset();
  }

  private _reset(){
    this.editting = false;
  }
}


