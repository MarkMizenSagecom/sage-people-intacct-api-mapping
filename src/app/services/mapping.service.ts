import { Injectable } from "@angular/core";
import { Observable, of, Subscriber } from 'rxjs';

import * as fromModels from 'src/app/models';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MappingHandler {

  constructor(){}

  createObject(data: fromModels.MappingDataComplete): fromModels.MappingOutput{

    let output: fromModels.MappingOutput = {};

    console.log(data);
    debugger;

    data.relationships.forEach(relationship => {

      const fromKey = relationship.from;
      const fromData = data.from[fromKey];

      const toKey = relationship.to;
      const toData = data.to[toKey];

      const outputLocation = toData.ref.split('.');

      // Location should be length 2
      if (outputLocation.length !== 2){
        throw new Error('Output location should include two parts')
      }

      if(!output[outputLocation[0]]) {
        output[outputLocation[0]] = {}
      }

      output[outputLocation[0]][outputLocation[1]] = fromData.ref;
    });

    return output;
  }

  getObject(data: fromModels.MappingDataComplete) : Observable<fromModels.MappingOutput> {
    return new Observable((subscriber: Subscriber<fromModels.MappingOutput>) => {
      try{
        const output: fromModels.MappingOutput = this.createObject(data);
        subscriber.next(output);
      } catch(error) {
        subscriber.error(error);
      }
      subscriber.complete();
    });
  }

  createJsonString(data: fromModels.MappingDataComplete): Observable<string>{
    return this.getObject(data).pipe(
      switchMap( (object)=> of(JSON.stringify(object)) )
    );
  }

  downloadJSON(data: fromModels.MappingDataComplete, fileName = 'mapping.json') {
    this.createJsonString(data).subscribe(json => {
      const jsonEncoded = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
      const linkElement = document.createElement('a');
      linkElement.setAttribute("href", jsonEncoded);
      linkElement.setAttribute("download", fileName);
      linkElement.click();
      linkElement.remove();
    });
  }

}
