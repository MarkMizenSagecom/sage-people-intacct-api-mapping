import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'amt-editable-title',
  template: `
  <div class="amt-editable-title">
    <a class="amt-editable-title__not-editing" (click)="$event.preventDefault();startEditing()" href="#" *ngIf="!editing else currentlyEditing">
      <span class="h2">{{ content }}</span>
      <amt-icon iconType="edit"></amt-icon>
    </a>
    <ng-template #currentlyEditing>
      <input
        #input
        type="text"
        class="amt-editable-title__input"
        [(ngModel)]="content"
        (blur)="doneEditing()"
        [maxlength]="maxChar"
        (keydown.enter)="$event.preventDefault();doneEditing()"
      />
    </ng-template>
  </div>
  `,
  styleUrls: ['./editable-title.component.less']
})
export class EditableTitleComponent {
  @Input() content: string;

  @Output() titleChanged: EventEmitter<string> = new EventEmitter();

  @ViewChild('input', {static: false}) inputElement: ElementRef;

  private _oldcontent: string;

  editing = false;

  maxChar = 40;

  startEditing() {
    this._oldcontent = this.content;
    this.editing = true;
    requestAnimationFrame(()=>{
      this.inputElement.nativeElement.focus();
    })
  }

  doneEditing() {
    if (this.content.length === 0) {
      this.content = this._oldcontent;
    } else if (this.content.length > this.maxChar){
      this.content = this.content.slice(0, (this.maxChar - 1));
    }

    this._oldcontent = null;
    this.editing = false;
    this.titleChanged.emit(this.content);
  }

}
