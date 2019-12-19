import { Component, Input, ViewChild, AfterViewInit, HostListener, ElementRef, OnChanges } from "@angular/core";

import * as fromModels from '../../../../models';
import { elementOffset } from 'src/app/core/helpers/from-top';

@Component({
  selector: 'amt-arrows',
  template: `
  <div class="amt-arrow-wrap" #svgWrap>
    <svg
      *ngIf="relationships"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      class="amt-arrow"
      [ngClass]="{'amt-arrow--highlighted': highlightRelated}"
      [attr.viewbox]=" '0 0 ' + height + ' 100' "
      [attr.height]="height"
      width="100">
      <g *ngFor="let rel of relationships" class="g-relationship" [ngClass]="{'g-relationship--highlighted': rel.highlight}">
        <path
          stroke="black"
          [attr.d]="buildPath(top, width, rel)"
          fill="transparent"
          stroke-width="2px"
        ></path>
      </g>
    </svg>
  </div>
  `,
  styleUrls: ['./arrow.component.less'],
})
export class ArrowsComponent implements AfterViewInit, OnChanges {

  @Input() highlightRelated = false;

  @Input() parentElement: ElementRef;

  @Input() relationships: fromModels.MappingRelationship;

  @ViewChild('svgWrap', {static: false}) wrapper;

  height = 100;
  width = 100;
  top = 0;

  private _init = false;

  buildPath(top: number, width: number, relationship: any): string {

    const startEle: HTMLElement = this.parentElement.nativeElement.querySelector(`amt-property-list-item[ng-reflect-id="${relationship.from}"]`);
    const endEle: HTMLElement = this.parentElement.nativeElement.querySelector(`amt-property-list-item[ng-reflect-id="${relationship.to}"]`);

    if (!startEle || !endEle) {
      return '';
    }

    const startRect = elementOffset(startEle);
    const startY = startRect.top + (startEle.offsetHeight / 2) - top;

    const endRect = elementOffset(endEle);
    const endY = endRect.top + (endEle.offsetHeight / 2) - top;

    return `M 0 ${startY}
      C ${.4 * width} ${startY},
        ${.6 * width} ${endY},
        ${width} ${endY}`;
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this._resize();
  }

  ngAfterViewInit(){
    requestAnimationFrame(()=>{
      this._init = true;
    });
  }

  ngOnChanges(){
    this._resize();
  }

  private _resize(){
    if (this._init){
      const rect = this.wrapper.nativeElement.getBoundingClientRect();
      this.width = Math.ceil(rect.width);
      this.height = Math.ceil(rect.height);

      this.top = Math.ceil(elementOffset(this.wrapper.nativeElement).top);
    }
  }

}
