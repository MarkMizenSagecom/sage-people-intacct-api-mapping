import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ConnectionServiceModule, ConnectionService } from 'ng-connection-service';

import { TextLogoComponent } from './components/text-logo/text-logo.component';
import { GridComponent } from './components/grid/grid.component';

import { FooterComponent } from './containers/footer/footer.component';
import { HeaderComponent } from './containers/header/header.component';
import { NetworkNoticeComponent } from './containers/network-notice/network-notice.component';
import { ButtonComponent } from './components/button/button.component';
import { EditableTitleComponent } from './components/editable-title/editable-title.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './components/icons/icons.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    NetworkNoticeComponent,
    TextLogoComponent,
    GridComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    EditableTitleComponent,
    IconComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ConnectionServiceModule,
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
    EditableTitleComponent,
    IconComponent,
    LoadingComponent,
  ]
})
export class CoreModule { }
