import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import * as fromModels from '../models';

import {exampleIntacctRepsonse, examplePeopleRepsonse} from '../mocks/api_responses';

abstract class ApiSchemaService{

  // The URI endpoint for recieving the schema
  abstract schemaEndpoint: string;

  // Returns the schema object
  abstract getSchema(): Observable<any>;

  // Gets the schema object then converts this to the mapping list data and categories
  abstract buildStructure(): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>;

  // Converts the data from the schema to the structure
  abstract convertData(input: any): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>;
}

@Injectable()
export class SagePeopleApiSchemaService implements ApiSchemaService{

  schemaEndpoint = 'This will be changed to the backend...';

  private _buildFields(
    data: fromModels.SagePeopleApiSchemaData,
    fields: fromModels.MappingListData = {},
    categories: fromModels.MappingListCategories = {},
    prefix = '$.',
    order = 0,
    category:string = null
  ): [fromModels.MappingListData, fromModels.MappingListCategories] {

    let newFields: fromModels.MappingListData = {};
    let newCategories: fromModels.MappingListCategories = {};

    Object.keys(data).forEach(key => {

      // Short circuit if issue with property
      if (!data.hasOwnProperty(key)){
        return;
      }

      // Get the item
      const item: fromModels.SagePeopleApiItem | fromModels.SagePeopleApiItemObject | fromModels.SagePeopleApiItemArray = data[key];

      // Check the item type
      if (fromModels.SagePeopleApiItemTypeGuard(item)){
        // Add single item
        newFields[key] = {
          label: item.label,
          ref: prefix + key,
          order: order++,
          category: category,
          type: (item.type as fromModels.MappingItemTypes) || null,
          length: item.length || null,
        };
      } else if (fromModels.SagePeopleApiItemArrayTypeGuard(item)) {

        // Add array of items (flattens them)
        const data = (item as fromModels.SagePeopleApiItemArray).data;

        // Adds category
        categories[key] = {
          label: key,
          order: order++
        };

        data.forEach((arrayItem:fromModels.SagePeopleApiItemArrayItem)=>{
          newFields[key + arrayItem.label] = {
            label: arrayItem.label,
            ref: `${prefix}${key}[?(@.source=='${arrayItem.source}')].value`,
            order: order++,
            type: (arrayItem.type as fromModels.MappingItemTypes) || null,
            length: arrayItem.length || null,
            category: key,
          };
        });

      } else if (fromModels.SagePeopleApiItemObjectTypeGuard(item)) {

        // Adds category
        categories[key] = {
          label: key,
          order: order++
        };

        [newFields, newCategories] = this._buildFields(
          (item as fromModels.SagePeopleApiItemObject).data,
          newFields,
          newCategories,
          prefix + key + '.',
          order,
          key
        );
      }

    });

    return [
      {...fields, ...newFields},
      {...categories, ...newCategories}
    ];
  }

  convertData(input: fromModels.SagePeopleApiSchema): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>{
    return of(this._buildFields(input.data));
  };

  getSchema():Observable<fromModels.SagePeopleApiSchema> {
    return of(examplePeopleRepsonse);
  }

  buildStructure(): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>{
    return this.getSchema().pipe(
      switchMap(
        (response:fromModels.SagePeopleApiSchema) => this.convertData(response)
      ),
      delay(500)
    );
  }
}

@Injectable()
export class SageIntacctApiSchemaService implements ApiSchemaService{

  schemaEndpoint = 'This will be changed to the backend...';

  private _buildFields(
    data: fromModels.SagePeopleApiSchemaData,
    fields: fromModels.MappingListData = {},
    categories: fromModels.MappingListCategories = {},
    prefix:string = '',
    order:number = 0,
    category:string = null,
  ): [fromModels.MappingListData, fromModels.MappingListCategories] {

    let newFields: fromModels.MappingListData = {};
    let newCategories: fromModels.MappingListCategories = {};

    Object.keys(data).forEach((key)=>{
      // Short circuit if issue with property
      if (!data.hasOwnProperty(key)){
        return;
      }
      // Get the item
      const item: fromModels.SageIntactApiItem | fromModels.SageIntactApiItemGroup = data[key];
      if (fromModels.SageIntactApiItemGroupTypeGuard(item)) {

        newCategories[key] = {
          label: key,
          order: order++
        };

        [newFields, newCategories] = this._buildFields(
          (item as fromModels.SageIntactApiItemGroup).data,
          newFields,
          newCategories,
          prefix + key + '.',
          order,
          key,
        );
      } else {
        // Add single item
        newFields[key] = {
          label: item.label,
          ref: prefix + key,
          order: order++,
          type: (item.type as fromModels.MappingItemTypes) || null,
          length: item.length || null,
          category
        };
      }
    });
    return [
      {...fields, ...newFields},
      {...categories, ...newCategories}
    ];
  }

  convertData(input: fromModels.SageIntactApiSchema): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>{
    return of(this._buildFields(input.data));
  };

  getSchema():Observable<fromModels.SageIntactApiSchema> {
    return of(exampleIntacctRepsonse);
  }

  buildStructure(): Observable<[fromModels.MappingListData, fromModels.MappingListCategories]>{
    return this.getSchema().pipe(
      switchMap(
        (response:fromModels.SageIntactApiSchema) => this.convertData(response)
      ),
      delay(500)
    );
  }
}
