import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import * as fromModels from '../../../../store/models';

import peopleMock from '../../mock/people';
import intacctMock from '../../mock/intacct';

@Injectable()
export class APIPropertiesService{
  constructor(){}

  getSagePeopleFields(): Observable<fromModels.ApiProperties>{
    return of(peopleMock).pipe(delay(500));
  }

  getSageIntacctFields(): Observable<fromModels.ApiProperties>{
    return of(intacctMock).pipe(delay(500));
  }

}
