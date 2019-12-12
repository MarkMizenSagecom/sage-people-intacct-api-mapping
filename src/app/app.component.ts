import { Component } from '@angular/core';

@Component({
  selector: 'amt-root',
  template: `
    <div class="amt-root">
      <amt-header></amt-header>
      <router-outlet></router-outlet>
      <amt-footer></amt-footer>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sage-people-api-mapping-tool';
}
