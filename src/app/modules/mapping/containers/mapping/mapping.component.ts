import { Component } from '@angular/core';

import * as fromModels from '../../models/models';

const relationships = {
  0: {
    from: "propertyKey",
    to: "propertyKey"
  }
};

const arrowsFromTo = Object.keys(relationships).map(key => {
  return {
    from: properties[relationships[key].from].position,
    to: properties[relationships[key].to].position
  };
});

const properties = {
  propertyKey: {
    name: "propertyName",
    position: 0
  }
};

@Component({
  selector: 'amt-mapping',
  template: `
    <div class="amt-mapping">
      <amt-grid>
        <div class="amt-mapping__container">
          <amt-property-list
            [properties]="sagePeopleFields"
            title="Sage People"
          ></amt-property-list>

          <amt-arrows
            [newRelationship]="newRelationship"
            [arrowsHeight]="listHeight"
            [relationships]="relationships"
            [from]="sagePeopleFields"
            [to]="sageIntacctFields"
            (remove)="deleteRelationship($event)"
          ></amt-arrows>

          <amt-property-list
            [properties]="sageIntacctFields"
            title="Sage Intacct"
          ></amt-property-list>
        </div>
      </amt-grid>
    </div>
  `,
  styleUrls: ['./mapping.component.less']
})
export class MappingComponent {

  // An object that tracks the relationships between the different fields
  relationships: fromModels.ApiRelationships = {};

  // Fields from Sage People
  sagePeopleFields: fromModels.ApiProperties;

  // Fields from Sage Intacct
  sageIntacctFields: fromModels.ApiProperties;

  // When adding a new relationship
  newRelationship: fromModels.ApiRelationship;

  // If the data is loaded
  loaded = false;

  // Height of the lists in px
  listHeight: number;


  constructor() {}

}
