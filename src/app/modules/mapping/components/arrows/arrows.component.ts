import { Component, Input, EventEmitter, Output, ViewChild, AfterViewInit, HostListener } from "@angular/core";

import * as fromModels from '../../../../models';

@Component({
  selector: 'amt-arrows',
  template: `
  <div #svgWrap>
    <svg
      *ngIf="from && to"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      class="amt-arrow"
      [attr.viewbox]=" '0 0 ' + height + ' 100' "
      [attr.height]="height"
      width="100">
      <!-- IF the new relationship, -->
      <g *ngIf="newRelationship && newRelationship?.from && newRelationship?.to" class="g-relationship__new">
        <!-- Add additional path here -->
        <path [attr.d]="buildPath(width, newRelationship)" fill="transparent" stroke="black"></path>
      </g>
      <g class="g-relationships">
        <!-- For each relationship, add a new one in here -->
        <g *ngFor="let rel of relationships" class="g-relationship">
          <path [attr.d]="buildPath(width, rel)" fill="transparent" stroke-width="2px" stroke="black"></path>
        </g>
      </g>
    </svg>
  </div>
  `,
  styleUrls: ['./arrow.component.less'],
})
export class ArrowsComponent implements AfterViewInit {
  @Input() from: fromModels.ApiProperties;

  @Input() to: fromModels.ApiProperties;

  @Input() newRelationship: fromModels.ApiRelationship;

  @Input() relationships: fromModels.ApiRelationship[];

  @Input('overallHeight') height : number;

  @Input() itemHeight : number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  @ViewChild('svgWrap', {static: false}) wrapper;

  width = 100;

  buildPath(width: number, relationship: fromModels.ApiRelationship): string {

    // Items:
    const start = this.from[relationship.from].index;
    const end = this.to[relationship.to].index;

    // Start and end y
    const startY = (start + .5) * (this.itemHeight - 1);
    const endY = (end + .5) * (this.itemHeight - 1);

    return `M 0 ${startY}
    C ${.4 * this.width} ${startY},
      ${.6 * this.width} ${endY},
      ${this.width} ${endY}`;
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this._resizeVectors();
  }

  ngAfterViewInit(){
    this._resizeVectors();
  }

  private _resizeVectors(){
    this.width = Math.ceil(this.wrapper.nativeElement.getBoundingClientRect().width);
  }

}
