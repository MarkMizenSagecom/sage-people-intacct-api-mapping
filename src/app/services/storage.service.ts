import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, forkJoin } from 'rxjs';
import { SagePeopleApiSchemaService, SageIntacctApiSchemaService } from './properties.service';
import { switchMap } from 'rxjs/operators';
import { IdService } from './id.service';
import * as fromModels from '../models';

@Injectable()
export class StorageService {

  endpoints: {
    mappingData: string,
    sagePeopleEmployment: string,
    sageIntacctEmployment: string,
  } = environment.endpoints;

  constructor(
    private http: HttpClient,
    private sagePeopleService: SagePeopleApiSchemaService,
    private sageIntacctService: SageIntacctApiSchemaService,
    private idService: IdService
  ) { }

  saveData(id:string, data): Observable<any> {
    const url = this.endpoints.mappingData + '/' + id;
    return this.http.put(url, data);
  }

  loadData(id:string): Observable<any> {
    const url = this.endpoints.mappingData + '/' + id;
    return this.http.get(url);
  }

  loadDefaultData(): Observable<fromModels.StorageDataFormat>{
    const fromData$ = this.sagePeopleService.buildStructure();
    const toData$ = this.sageIntacctService.buildStructure()

    return forkJoin([fromData$, toData$]).pipe(
      switchMap((data) => {
        const [from, to] = data;
        return of({
          name:'',
          id: this.idService.getId(),
          data:{
            from: {
              properties: from[0],
              categories: from[1],
            },
            to: {
              properties: to[0],
              categories: to[1],
            },
            mapping: []
          }
        });
      }
    ));
  }
}
