import { Component, Input, EventEmitter, Output } from "@angular/core";

import * as fromModels from '../../../../store/models';

@Component({
  selector: 'amt-arrows',
  template: `<svg
    *ngIf="from && to"
    class="amt-arrows"
    [attr.viewbox]=" '0 0 ' + height + ' ' + width "
    [attr.height]="height"
    width="100%">
    <!-- IF the new relationship, -->
    <g *ngIf="newRelationship" class="g-relationship__new">
      <!-- Add additional path here -->
      <path [attr.d]="buildPath(newRelationship)" fill="transparent" stroke="black"></path>
    </g>
    <g class="g-relationships">
      <!-- For each relationship, add a new one in here -->
      <g *ngFor="let rel of relationships | keyvalue" class="g-relationship">
        <path [attr.d]="buildPath(rel)" fill="transparent" stroke="black"></path>
      </g>
    </g>
  </svg>`,
  styleUrls: ['./arrow.component.less'],
})
export class ArrowsComponent {
  @Input() from: fromModels.ApiProperties;

  @Input() to: fromModels.ApiProperties;

  @Input() newRelationship: fromModels.ApiRelationship;

  @Input() relationships: fromModels.ApiRelationships;

  @Input('overallHeight') height : number;

  @Input() itemHeight : number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  width: 100;


  buildPath(relationship: fromModels.ApiRelationship): string {

    // Items:
    const start = this.from[relationship.from].index;
    const end = this.to[relationship.to].index;

    // Start and end y
    const startY = start - .5 * this.itemHeight;
    const endY = end - .5 * this.itemHeight;

    // distance between the points
    const dy = startY - endY;

    return `M 0 ${startY}
    C 0 ${startY}, 40 ${startY + (dy / 3)}
    C 60 ${endY}, 100 ${endY - (dy / 3)}
    Z`;
  }

}
