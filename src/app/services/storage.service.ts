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

  getAllMappingFiles():Observable<fromModels.StorageDataFormat[]>{
    return this.http.get(this.endpoints.mappingData) as Observable<fromModels.StorageDataFormat[]>;
  }

  saveData(data: fromModels.StorageDataFormat, newData:boolean, id?:string): Observable<fromModels.StorageDataFormat> {
    if(newData) {
      const url = this.endpoints.mappingData;
      return this.http.post(url, data) as Observable<fromModels.StorageDataFormat>;
    } else {
      const url = this.endpoints.mappingData + '/' + id;
      return this.http.put(url, data) as Observable<fromModels.StorageDataFormat>;
    }
  }

  loadData(id:string): Observable<fromModels.StorageDataFormat> {
    const url = this.endpoints.mappingData + '/' + id;
    return this.http.get(url) as Observable<fromModels.StorageDataFormat>;
  }

  loadDefaultData(): Observable<fromModels.StorageDataFormat>{
    const fromData$ = this.sagePeopleService.buildStructure();
    const toData$ = this.sageIntacctService.buildStructure()

    return forkJoin([fromData$, toData$]).pipe(
      switchMap((data) => {
        const [from, to] = data;
        return of({
          name: 'New mapping file',
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
