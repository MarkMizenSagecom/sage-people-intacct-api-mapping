import { Component } from '@angular/core';

@Component({
  selector: 'amt-root',
  template: `
    <div class="amt-root">
      <amt-header></amt-header>
      <main class="amt-root__main">
        <router-outlet></router-outlet>
      </main>
      <amt-network-notice></amt-network-notice>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sage-people-api-mapping-tool';
}
