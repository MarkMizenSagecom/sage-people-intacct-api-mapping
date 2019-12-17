import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromModels from 'src/app/models';

import { Observable, combineLatest, Subscription } from 'rxjs';

import { APIPropertiesService } from 'src/app/services/properties.service';
import { APIRelationshipsService } from 'src/app/services/relationships.service';

@Component({
  selector: 'amt-mapping',
  template: `
    <div class="amt-mapping" (click)="clearStates()">
      <amt-grid>
        <div class="amt-mapping__top">
          <input class="sds_editable_title" type="text" value="Initial test..."/>
          <button>Save</button>
          <button>Download</button>
          <button (click)="clearRelationships()">Clear all</button>
        </div>
        <div class="amt-mapping__item">
          <amt-property-list
            [relationships]="relationships"
            [properties]="fromProperties"
            [lhs]="true"
            title="Sage People"
            (clickedProperty)="handleFromPropertyClicked($event)"
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
            [relationships]="relationships"
            [properties]="toProperties"
            title="Sage Intacct"
            (clickedProperty)="handleToPropertyClicked($event)"
          ></amt-property-list>

          <amt-new-field (createNew)="addNewField($event)"></amt-new-field>

        </div>
      </amt-grid>
    </div>
  `,
  styleUrls: ['./mapping.component.less']
})
export class MappingComponent implements OnInit, OnDestroy {

  // Fields from Sage People
  sagePeopleFields$: Observable<fromModels.ApiProperties>;

  // Fields from Sage Intacct
  sageIntacctFields$: Observable<fromModels.ApiProperties>;

  relationships: fromModels.ApiRelationship[] = [];
  fromProperties: fromModels.ApiProperties;
  toProperties: fromModels.ApiProperties;

  // When adding a new relationship
  newRelationship: fromModels.ApiRelationship;

  // If the data is loaded
  loaded = false;

  // Height of the lists in px
  listHeight: number;
  itemHeight: number = 42;

  private _subscriptions: Subscription;


  constructor(
    private propertyService: APIPropertiesService,
    private relationshipService: APIRelationshipsService
  ) { }

  ngOnInit(){

    // Load data from services
    this.sagePeopleFields$ = this.propertyService.getSagePeopleFields();
    this.sageIntacctFields$ = this.propertyService.getSageIntacctFields();

    this._subscriptions = combineLatest(
      this.sagePeopleFields$,
      this.sageIntacctFields$
    ).subscribe(([sagePeopleData, sageIntacctData])=>{
      this.listHeight = Math.max(
        Object.keys(sagePeopleData).length,
        Object.keys(sageIntacctData).length
      ) * this.itemHeight;

      if (this.listHeight > 0){
        this.loaded = true;
      }

      this.fromProperties = sagePeopleData;
      this.toProperties = sageIntacctData;
    });
  }

  handleFromPropertyClicked([property, action]) {
    switch(action){
      case "add":

        if(this.newRelationship && this.newRelationship.from === property) {
          this.newRelationship = null;
          this.clearStates();
        } else {
          this.clearStates();
          this.newRelationship = {from: property, to:null};
          this._disableToProperties(property);
        }

        break;
      case "remove":
        // If action is remove then clear all relationships which are from this property
        this._removeRelationship('from', property);
        break;
      default:
        // if no action, then use highlighted state
        this.clearStates();
        this._highlightRelatedProperties('from', property);
        break
    }
  }

  handleToPropertyClicked([property, action]) {
    switch(action){
      case "add":
        break;
      case "remove":
        this._removeRelationship('to', property);
        if (this.newRelationship){
          this.newRelationship = null;
        }
        this.clearStates();
        break;
      default:
        if (this.newRelationship && this.newRelationship.from && this.toProperties[property].state !== 'disabled') {
          this.newRelationship = {
            ...this.newRelationship,
            to: property
          }
          this._saveNewRelationship();
          this.clearStates();
        } else {
          this.clearStates();
          this._highlightRelatedProperties('to', property);
        }
        break
    }
    // if no action, check if 'from' selected. If from is selected then

    // If action is add, then throw error. the to side can't add

    // If action is remove then clear relationship where this is the to property
  }

  private _saveNewRelationship(){
    if (!this.newRelationship || !this.newRelationship.from || !this.newRelationship.to) {
      return;
    }
    this.relationships = [...this.relationships, this.newRelationship];
    this.newRelationship = null;
  }

  private _removeRelationship(direction: 'from' | 'to' = 'to', property: string) {
    if (this.relationships.length < 1) {
      return;
    }
    const updatedRelationships = this.relationships.filter(item => {
      return item[direction] !== property
    })
    this.relationships = [...updatedRelationships];
  }

  private _disableToProperties(fromProperty: string){
    const target = this.fromProperties[fromProperty];

    if (!target){
      return;
    }

    let newTo: fromModels.ApiProperties = {};

    // Set disabled state on from items
    Object.keys(this.toProperties).forEach(key => {
      const thisItem = this.toProperties[key];
      if (this.relationships.filter(item => item.to === key).length) {
        newTo[key] = {...thisItem, state: 'disabled'};
      } else {
        newTo[key] = {...thisItem};
      }
    });

    this.toProperties = newTo;

    this.fromProperties[fromProperty] = {...target, state: 'selected'};
  }

  clearStates(){
    const to = this.toProperties;
    Object.keys(to).forEach(key => {
      delete to[key].state;
    });
    this.toProperties = {...to};

    const from = this.fromProperties;
    Object.keys(from).forEach(key => {
      delete from[key].state;
    });
    this.fromProperties = {...from};
  }

  private _highlightRelatedProperties(direction: 'from' | 'to', property: string) {
    const relationshipsToHighlight = this.relationships.filter((item)=>item[direction] === property);
    relationshipsToHighlight.forEach(item => {
      this.fromProperties[item.from] = {...this.fromProperties[item.from], state: 'highlighted'};
      this.toProperties[item.to] = {...this.toProperties[item.to], state: 'highlighted'};
    });
    if (direction === 'from'){
      this.fromProperties[property] = {...this.fromProperties[property], state: "highlighted"};
    }
    if (direction === 'to'){
      this.toProperties[property] = {...this.toProperties[property], state: "highlighted"};
    }
  }

  ngOnDestroy(){
    this._subscriptions.unsubscribe();
  }

  clearRelationships() {
    this.relationships = [];
  }

  addNewField(event: any){
    console.log(event);
  }

}
