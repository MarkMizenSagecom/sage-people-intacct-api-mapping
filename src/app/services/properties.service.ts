import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import * as fromModels from '../models';

import peopleMock from '../mocks/people';
import intacctMock from '../mocks/intacct';


const examplePeople = {
  "id": "a2G7E000000LlIDUA0",
  "hrDepartment": "Finance",
  "fullName": "Chuck Hamilton",
  "firstName": "Charles",
  "lastName": "Hamilton",
  "emailAddress": "Charles.Hamilton@DemoCompany.com",
  "currentEmployment": {
    "startDate": "2018-01-02",
    "name": "2019.02 #35",
    "jobTitle": "Finance Assistant",
    "endDate": "2018-01-01",
    "active": true
  },
  "workAddress": {
    "name": "Work location 44",
    "line1": "Hoover Bldg",
    "line2": "12 MainSt",
    "line3": "Hampstead Heath",
    "city": "Reading",
    "region": "Berkshire",
    "postalCode": "R11 2YY",
    "country": "United Kingdom"
  },
  "additionalFields": [
    {
      "name": "Age",
      "value": 24,
      "source": "fHCM2__Age__c"
    }
  ]
}

const data = {
  "id": {
    id: "fHCM2__Emplyee__c.id",
    reference: "$.id",
    name: "id",
    type: "",
    state: null,
  },
  "fHCM2__Age__c": {
    id: "fHCM2__Age__c",
    reference: "$.additionalFields[?(@.source=='NI_or_SS_Number__c')].value",
    name: "Age",
    type: "number",
    state: null,
  }
}

// Move to helpers
const isObject = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};


type additionalFields = {
  name: string,
  source: string,
  value?: any,
}

@Injectable()
export class APIPropertiesService{

  constructor(){}

  private _buildAdditionaFields(data: additionalFields[]): fromModels.ApiProperties{
    let output: fromModels.ApiProperties = {};
    data.forEach(item => {
      const id = 'Additional_Field_'+ item.name
      let type : 'string' | 'number';
      switch (typeof item.value){
        case "number":
          type = "number";
          break;
        case "string":
          type = "number";
          break;
      }
      output[id] = {
        id,
        name: item.name,
        index: null,
        type,
      }
    });
    return output;
  };
  private _buildFields(data, fields = {}, prefix = '$.'): fromModels.ApiProperties {
    Object.keys(data).forEach(key => {

      let newFields = {};

      // Check exists
      if (!data.hasOwnProperty(key)){
        console.log(`ISSUE WITH PROPERTY: ${key}`);
        return null;
      }

      // get data
      const item = data[key];

      // Handle additional fields
      if (key === "additionalFields") {
        // Handle additional fields
        newFields = this._buildAdditionaFields(item);
        return {...fields, ...newFields};
      }

      // Check what type data is
      if (typeof item === "string"){
        newFields[key] = {
          id: key,
          name: key,
          reference: prefix+key,
          type: "string"
        };
      } else if (typeof item === "number"){
        newFields[key] = {
          id: key,
          name: key,
          reference: prefix+key,
          type: "number"
        };
      } else if (isObject(item)){
        newFields = {...this._buildFields(item, {}, prefix + key + '.')};
      }

      return fields = {
        ...fields,
        ...newFields
      };
    });

    // Add initial order:
    let index = 0;
    Object.keys(fields).forEach(key => {
      if (!fields.hasOwnProperty(key)){
        return;
      }
      fields[key] = {
        ...fields[key],
        index: index++
      };
    });

    return fields;
  }

  getSagePeopleFields(id?: string): Observable<fromModels.ApiProperties>{
    const fields = this._buildFields(examplePeople);

    console.log(fields);
    return of(fields).pipe(delay(500));
  }

  getSageIntacctFields(id?: string): Observable<fromModels.ApiProperties>{
    return of(intacctMock).pipe(delay(500));
  }

}
