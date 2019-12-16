import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Custom modules
import { CoreModule } from '../../core/core.module';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyListItenComponent } from './components/property-list-item/property-list-item.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { AddRelationshipComponent } from './components/add-relationship/add-relationship.component';

// Module components
@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyListItenComponent,
    ArrowsComponent,
    MappingComponent,
    AddRelationshipComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
})
export class MappingModule {}
