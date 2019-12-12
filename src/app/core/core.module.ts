import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TextLogoComponent } from './components/text-logo/text-logo.component';
import { GridComponent } from './components/grid/grid.component';

import { FooterComponent } from './containers/footer/footer.component';
import { HeaderComponent } from './containers/header/header.component';

@NgModule({
  declarations: [
    TextLogoComponent,
    GridComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    TextLogoComponent,
    GridComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
