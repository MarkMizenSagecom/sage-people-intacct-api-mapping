import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ConnectionServiceModule, ConnectionService } from 'ng-connection-service';

import { TextLogoComponent } from './components/text-logo/text-logo.component';
import { GridComponent } from './components/grid/grid.component';

import { FooterComponent } from './containers/footer/footer.component';
import { HeaderComponent } from './containers/header/header.component';
import { NetworkNoticeComponent } from './containers/network-notice/network-notice.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    NetworkNoticeComponent,
    TextLogoComponent,
    GridComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    ConnectionServiceModule
  ],
  providers: [
    ConnectionService,
  ],
  exports: [
    NetworkNoticeComponent,
    TextLogoComponent,
    GridComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
  ]
})
export class CoreModule { }
