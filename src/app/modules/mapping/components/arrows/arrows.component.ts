import { Component, Input, EventEmitter, Output } from "@angular/core";

import * as fromModels from '../../models/models';

@Component({
  selector: 'amt-arrows',
  template: `<svg
    class="amt-arrows"
    [attr.viewbox]=" height + ' ' + width + ' 0 0' "
    [attr.height]="height"
    width="100%">
    <!-- IF the new relationship, -->
    <g *ngIf="newRelationship" class="g-relationship__new">
      <!-- Add additional path here -->
      <path [attr.d]="buildPath(newRelationship)"></path>
    </g>
    <g class="g-relationships">
      <!-- For each relationship, add a new one in here -->
      <g *ngFor="let rel of relationships | keyvalue" class="g-relationship">
        <path [attr.d]="buildPath(rel)"></path>
      </g>
    </g>
  </svg>`,
  styleUrls: [],
})
export class ArrowsComponent {
  @Input() from: fromModels.ApiProperties;

  @Input() to: fromModels.ApiProperties;

  @Input() newRelationship: fromModels.ApiRelationship;

  @Input() relationships: fromModels.ApiRelationships;

  @Input('arrowsHeight') height : number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  width: 100;

  buildPath(rel: fromModels.ApiRelationship): string {

    const start = this.from[rel.from].index;
    const end = this.from[rel.to].index;

    return 'M';
  }

}
