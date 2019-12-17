import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Custom modules
import { CoreModule } from '../../core/core.module';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyListItenComponent } from './components/property-list-item/property-list-item.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { AddRelationshipComponent, RemoveRelationshipComponent } from './components/change-relationship/change-relationship.component';
import { APIPropertiesService } from 'src/app/services/properties.service';
import { APIRelationshipsService } from 'src/app/services/relationships.service';
import { NewFieldComponent } from './components/new-field/new-field.component';

// Module components
@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyListItenComponent,
    ArrowsComponent,
    MappingComponent,
    AddRelationshipComponent,
    RemoveRelationshipComponent,
    NewFieldComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    APIPropertiesService,
    APIRelationshipsService
  ]
})
export class MappingModule {}
