import { Component } from '@angular/core';

@Component({
  selector: 'amt-footer',
  template: `
    <footer class="amt-footer">
      <amt-grid>
        <h2>FOOTER GOES HERE...</h2>
      </amt-grid>
    </footer>
  `,
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {}
