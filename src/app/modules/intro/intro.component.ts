import { Component } from "@angular/core";

@Component({
  selector: 'amt-intro',
  template: `<div class="amt-intro">
  <p>THIS is THE INTRO...</p>
  <a routerLink="mapping" href="/mapping">Mapping</a>
  </div>`,
})
export class IntroComponent {}
