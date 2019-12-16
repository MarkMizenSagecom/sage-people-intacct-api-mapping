import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromModels from '../../../../store/models';
import { APIPropertiesService } from '../../services/properties/properties.service';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'amt-mapping',
  template: `
    <div class="amt-mapping">
      <amt-grid>

        <div class="amt-mapping__item">
          <amt-property-list
            [properties]="sagePeopleFields$ | async"
            [lhs]="true"
            title="Sage People"
          ></amt-property-list>
        </div>

        <div class="amt-mapping__item">
          <amt-arrows
          [newRelationship]="newRelationship"
          [overallHeight]="listHeight"
          [itemHeight]="itemHeight"
          [relationships]="relationships"
          [from]="sagePeopleFields$ | async"
          [to]="sageIntacctFields$ | async"
          (remove)="deleteRelationship($event)"
          ></amt-arrows>
        </div>

        <div class="amt-mapping__item">
          <amt-property-list
            [properties]="sageIntacctFields$ | async"
            title="Sage Intacct"
          ></amt-property-list>
        </div>

      </amt-grid>
    </div>
  `,
  styleUrls: ['./mapping.component.less']
})
export class MappingComponent implements OnInit, OnDestroy {

  // An object that tracks the relationships between the different fields
  relationships: fromModels.ApiRelationships = {};

  // Fields from Sage People
  sagePeopleFields$: Observable<fromModels.ApiProperties>;

  // Fields from Sage Intacct
  sageIntacctFields$: Observable<fromModels.ApiProperties>;

  // When adding a new relationship
  newRelationship: fromModels.ApiRelationship;

  // If the data is loaded
  loaded = false;

  // Height of the lists in px
  listHeight: number;
  itemHeight: number = 42;

  private _subscriptions;

  constructor(
    private apiProperties: APIPropertiesService
  ) {}

  ngOnInit(){
    this.sagePeopleFields$ = this.apiProperties.getSagePeopleFields();
    this.sageIntacctFields$ = this.apiProperties.getSageIntacctFields();

    this._subscriptions = combineLatest(
      this.sagePeopleFields$,
      this.sageIntacctFields$
    ).subscribe(([sagePeopleData, sageIntacctData])=>{
      this.listHeight = Math.max(
        Object.keys(sagePeopleData).length,
        Object.keys(sageIntacctData).length
      ) * this.itemHeight;

      this.loaded = true;

      console.log(sagePeopleData, sageIntacctData);
    });
  }

  ngOnDestroy(){
    this._subscriptions.unsubscribe();
  }

  deleteRelationship(item: number){

  }
}
