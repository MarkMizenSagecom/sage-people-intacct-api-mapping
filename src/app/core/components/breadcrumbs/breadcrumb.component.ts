import { Component } from "@angular/core";

@Component({
  selector: 'amt-breadcrumb',
  template: `
  <a routerLink="/" href="/"><amt-icon iconType="arrow_left"></amt-icon> Back</a>
  `,
})
export class BreadcrumbComponent{}
