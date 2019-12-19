import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'apt-modal',
  template: `
  <aside class="apt-modal" *ngIf="open">
    <div class="apt-modal__header">
      <h2 class="h3">{{ title }}</h2>
      <button class="apt-modal__close">
        Close
      </button>
    </div>
    <div class="apt-modal__body">
      <ng-content></ng-content>
    </div>
    <div class="apt-modal__footer">
      <button
        class="apt-button"
        *ngFor="let option of options"
        (click)="handleClick(option.action, $event)"
      >{{ option.label }}</button>
    </div>
  </aside>
  `,
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {

  @Input() open: boolean = false;
  @Input() title: string;
  @Input() options: {label: string, action: string}[];

  @Output() optionPressed: EventEmitter<[string, any]> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  closeModal(){
    this.open = false;
    this.close.emit();
  }

  handleClick(action: string, event: any) {
    this.optionPressed.emit([action, event])
  }
}
