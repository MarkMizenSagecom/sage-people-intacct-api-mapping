import { Component } from '@angular/core';

@Component({
  selector: 'amt-footer',
  template: `
    <div class="amt-footer">
      <amt-grid>
        <h2>FOOTER GOES HERE...</h2>
      </amt-grid>
    </div>
  `,
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {}
