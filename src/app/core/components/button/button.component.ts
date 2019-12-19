import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'amt-button',
  template: `
  <button
    class="amt-button"
    [ngClass]="'amt-button--'+flavour"
    (click)="handleClick($event)"
    (keydown.enter)="handleClick($event)"
  ><ng-content></ng-content></button>
  `,
  styleUrls: ['./button.component.less']
})
export class ButtonComponent {

  @Input() flavour: 'string';

  @Output() pressed:EventEmitter<any> = new EventEmitter();

  // Handles clicking the button. Passes the nativeEvent
  handleClick(event: any) {
    this.pressed.emit(event);
  }
}
