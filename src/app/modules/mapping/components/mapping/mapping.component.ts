import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';

import * as fromModels from 'src/app/models';

import { Observable } from 'rxjs';

import { MappingHandler } from 'src/app/services/mapping.service'
import { SageIntacctApiSchema, SagePeopleApiSchema } from 'src/app/services/properties.service';
import { PropertyListComponent } from '../property-list/property-list.component';

@Component({
  selector: 'amt-mapping',
  template: `
    <div class="amt-mapping" (click)="clearStates()">
      <amt-grid>
        <div class="amt-mapping__top">
          <div class="amt-mapping__top-left">
            <amt-editable-title [content]="fileTitle" titleChanged="fileTitle = $event"></amt-editable-title>
          </div>
          <div class="amt-mapping__top-right">
            <button class="sds-button sds-button--small sds-button--icon" (click)="saveMappingData()">Save <amt-icon iconType="save" size="small"></amt-icon></button>
            <button class="sds-button sds-button--small sds-button--icon" (click)="exportMappingData()">Download <amt-icon iconType="download" size="small"></amt-icon></button>
            <button class="sds-button sds-button--small sds-button--destructive" (click)="clearRelationships()">Clear all</button>
          </div>
        </div>
        <div class="amt-mapping__item">
          <amt-property-list
            [relationships]="relationships"
            [properties]="fromProperties"
            [categories]="fromCategories"
            [lhs]="true"
            title="Sage People"
            (clickedProperty)="handleFromPropertyClicked($event)"
          ></amt-property-list>
        </div>

        <div class="amt-mapping__item">
          <amt-arrows
            [highlightRelated]="highlightRelated"
            [relationships]="relationships"
            [parentElement]="element"
        ></amt-arrows>
        </div>

        <div class="amt-mapping__item">
          <amt-property-list
            [relationships]="relationships"
            [properties]="toProperties"
            [categories]="toCategories"
            title="Sage Intacct"
            (clickedProperty)="handleToPropertyClicked($event)"
          ></amt-property-list>
          <amt-new-field (createNew)="addNewField($event)"></amt-new-field>
        </div>
        <div class="amt-mapping__bottom">
          <button class="sds-button sds-button--small sds-button--icon" (click)="saveMappingData()">Save <amt-icon iconType="save" size="small"></amt-icon></button>
          <button class="sds-button sds-button--small sds-button--icon" (click)="exportMappingData()">Download <amt-icon iconType="download" size="small"></amt-icon></button>
          <button class="sds-button sds-button--small sds-button--destructive" (click)="clearRelationships()">Clear all</button>
        </div>
      </amt-grid>
    </div>
  `,
  styleUrls: ['./mapping.component.less']
})
export class MappingComponent implements OnInit, OnDestroy {

  // Fields from Sage People
  fromData$: Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>;
  fromProperties: fromModels.MappingListData = {};
  fromCategories: fromModels.MappingListCategories = {};

  // Fields from Sage Intacct
  toData$: Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>;
  toProperties: fromModels.MappingListData = {};
  toCategories: fromModels.MappingListCategories = {};

  // Relationships
  newRelationship: fromModels.MappingRelationship = null;
  relationships: fromModels.MappingRelationship[] = [];

  // List elements
  @ViewChildren(PropertyListComponent) propertyLists !: QueryList<PropertyListComponent>;

  // Whether to highlight values
  highlightRelated = false;

  // The title of the file
  fileTitle = 'Mapping File Title';

  constructor(
    private sagePeopleService: SagePeopleApiSchema,
    private sageIntacctService: SageIntacctApiSchema,
    private mappingService: MappingHandler,
    public element: ElementRef
  ) { }

  ngOnInit() {
    // TODO: get the current path and add logic for handling how to load in variables

    // Load data from services
    this.fromData$ = this.sagePeopleService.buildStructure();
    this.toData$ = this.sageIntacctService.buildStructure();

    // Subscribe
    this.fromData$.subscribe(([properties, categories])=>{
      this.fromProperties = properties;
      this.fromCategories = categories;
    });

    this.toData$.subscribe(([properties, categories])=>{
      this.toProperties = properties;
      this.toCategories = categories;
    });
  }

  // Handles clicking on 'from' properties
  handleFromPropertyClicked([property, action, _]) {
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

  // Handles clicking on 'to' properties
  handleToPropertyClicked(event) {
    const [property, action, nativeEvent] = event;
    switch(action){
      // case "add":
      //   break;
      case "remove":
        this._removeRelationship('to', property);
        if (this.newRelationship){
          this.newRelationship = null;
        }
        this.clearStates();
        break;
      default:
        if (this.newRelationship && this.newRelationship.from && this.toProperties[property].state !== 'disabled') {
          const savedFrom = this.newRelationship.from;
          this.newRelationship = {
            ...this.newRelationship,
            to: property
          }
          this._saveNewRelationship();
          this.clearStates();

          // If holding the shift key, allow for multiple selection
          if (nativeEvent && nativeEvent.shiftKey){
            this.newRelationship = {from: savedFrom, to: null};
            this._disableToProperties(savedFrom);
          }

        } else {
          this.clearStates();
          this._highlightRelatedProperties('to', property);
        }
        break
    }
  }

  // Adds a new relationship
  private _saveNewRelationship(){
    if (!this.newRelationship || !this.newRelationship.from || !this.newRelationship.to) {
      return;
    }
    const existing = this.relationships.filter(item => item.from === this.newRelationship.from && item.to === this.newRelationship.to);
    if (existing.length < 1) {
      this.relationships = [...this.relationships, this.newRelationship];
    }
    this.newRelationship = null;
  }

  // Removes a relationship
  private _removeRelationship(direction: 'from' | 'to' = 'to', property: string) {
    if (this.relationships.length < 1) {
      return;
    }
    const updatedRelationships = this.relationships.filter(item => {
      return item[direction] !== property
    })
    this.relationships = [...updatedRelationships];
  }

  // Disables properties when creating new relationship
  private _disableToProperties(fromProperty: string){
    const target = this.fromProperties[fromProperty];

    if (!target){
      console.log('no from');
      return;
    }

    let newTo = {};

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

  // Clears all states
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

    this.newRelationship = {from: null, to:null};

    this.highlightRelated = false;
    this.relationships = this.relationships.map(item => (Object.assign({}, {...item, highlight: false}) ))
  }

  // Highlights properties when selecting a property
  private _highlightRelatedProperties(direction: 'from' | 'to', property: string) {

    // Get list of relationships to highlight
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

    this.highlightRelated = true;
    this.relationships = this.relationships.map(item => {
      if (item[direction] === property){
        return Object.assign({}, {...item, highlight: true});
      };
      return item
    });
  }


  @HostListener('document:keyup', ['$event'])
  handleShiftUp(nativeEvent) {
    console.log('keyup', nativeEvent.key, this.newRelationship);
    if (nativeEvent.key === 'Shift' && this.newRelationship) {
      console.log('clear states...');
      this.clearStates();
    }
  }

  ngOnDestroy(){
    // TODO: Close subscriptions
  }

  // Clears all relationships
  clearRelationships() {
    this.relationships = [];
  }

  // Adds a new feild to the Sage Intacct side
  addNewField(event: any){
    console.log(event);
  }

  // Downloads the current mapping data as a json file
  exportMappingData() {
    this.mappingService.downloadJSON({
      from: this.fromProperties,
      to: this.toProperties,
      relationships: this.relationships
    }, this.fileTitle);
  }

  // Saves the mapping data to the backend
  saveMappingData() {
    alert('save data');
  }
}
