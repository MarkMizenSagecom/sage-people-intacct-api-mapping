import { Component } from '@angular/core';

@Component({
  selector: 'amt-header',
  template: `
    <header class="amt-header">
      <amt-grid>
        <amt-text-logo text="Sage People API Mapping Tool"></amt-text-logo>
      </amt-grid>
    </header>
  `,
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {}
