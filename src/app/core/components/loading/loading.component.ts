import { Component } from "@angular/core";

@Component({
  selector: 'amt-loading',
  template: `
  <div class="amt-loading">
    <span class="sr-only">Loading&hellip;</span>
    <div class="amt-loading__pips">
      <div class="amt-loading__pip amt-loading__pip--1"></div>
      <div class="amt-loading__pip amt-loading__pip--2"></div>
      <div class="amt-loading__pip amt-loading__pip--3"></div>
    </div>
  </div>`,
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent {

}
