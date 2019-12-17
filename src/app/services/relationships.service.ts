import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import * as fromModels from '../models';

import relationships from '../mocks/relationships';

@Injectable()
export class APIRelationshipsService{
  constructor(){}

  createJsonObject(relationships: fromModels.ApiRelationship[]): Observable<string>{
    let object = {};
    return of(JSON.stringify(object));
  }

}
