import { Component, Input } from "@angular/core";

@Component({
  selector: 'amt-icon',
  template: `
    <span
      [ngClass]="iconClasses"
    ></span>
  `,
  styleUrls: ['./icons.component.less']
})
export class IconComponent {

  @Input() iconType: string;

  @Input() size: string;

  @Input() theme: string;

  @Input() shape: 'circle' | 'square';

  get iconClasses(){
    let classes = ['amt-icon'];
    if (this.iconType) {
      classes = [...classes, 'amt-icon--' + this.iconType];
    }
    if (this.size) {
      classes = [...classes, 'amt-icon--' + this.size];
    }
    if (this.theme) {
      classes = [...classes, 'amt-icon--theme-' + this.theme];
    }
    if (this.shape) {
      classes = [...classes, 'amt-icon--shape-' + this.shape];
    }
    return classes.join(' ');
  }
}
