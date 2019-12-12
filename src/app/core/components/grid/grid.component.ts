import { Component } from '@angular/core';

@Component({
  selector: 'amt-grid',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./grid.component.less']
})
export class GridComponent {}
