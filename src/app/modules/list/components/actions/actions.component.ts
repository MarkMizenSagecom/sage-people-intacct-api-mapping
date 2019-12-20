import { Component, Input } from "@angular/core";

@Component({
  selector: 'amt-actions',
  template: `
  <div class="amt-actions">
    <button class="sds-button sds-button--small sds-button--icon" role="display">{{ label }}<amt-icon iconType="dropdown" size="small"></amt-icon></button>
    <div class="amt-actions__dropdown" aria-hidden="false">
      <ng-content selector="button"></ng-content>
    </div>
  </div>
  `,
  styleUrls: ['./actions.component.less']
})
export class ActionsComponent {
  @Input() label: string
}
