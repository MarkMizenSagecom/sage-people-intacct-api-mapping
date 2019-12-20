import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Custom modules
import { CoreModule } from '../../core/core.module';
import { ListComponent } from './components/list/list.component';
import { TableComponent } from './components/table/table.component';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';

// Module components
@NgModule({
  declarations: [
    ListComponent,
    TableComponent,
    ActionsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    CoreModule,
  ],
  exports: [
    ListComponent,
  ],
  providers: [],
})
export class ListModule {}
