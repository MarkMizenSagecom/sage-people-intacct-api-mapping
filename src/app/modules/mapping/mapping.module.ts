import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Custom modules
import { CoreModule } from '../../core/core.module';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyListItemComponent } from './components/property-list-item/property-list-item.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { AddRelationshipComponent, RemoveRelationshipComponent } from './components/change-relationship/change-relationship.component';
import { SageIntacctApiSchemaService, SagePeopleApiSchemaService } from 'src/app/services/properties.service';
import { MappingHandler } from 'src/app/services/mapping.service'
import { NewFieldComponent } from './components/new-field/new-field.component';
import { StorageService } from 'src/app/services/storage.service';
import { IdService } from 'src/app/services/id.service';

// Module components
@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyListItemComponent,
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
    IdService,
    StorageService,
    SageIntacctApiSchemaService,
    SagePeopleApiSchemaService,
    MappingHandler
  ]
})
export class MappingModule {}
