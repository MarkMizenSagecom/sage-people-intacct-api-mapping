import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
import * as fromModels from '../../models';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';

import * as fromSelected from './selected.reducer';
import * as fromRelationships from './relationships.reducer';
import * as fromProperties from './properties.reducer';

export interface AppState {
  selectedProperty: any,
  people: {
    data: any,
    loading: boolean,
    loaded: boolean,
  },
  intacct: {
    data: any,
    loading: boolean,
    loaded: boolean,
  }
  relationships: any[]
};

export const reducers = {
  selectedProperty: fromSelected.selectedReducers,
  people: fromProperties.peopleReducers,
  intacct: fromProperties.intacctReducers,
  relationships: fromRelationships.relationshipsReducers
};

export const reducerToken = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export const reducerProvider = [{ provide: reducerToken, useValue: reducers }];

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state: any, action: any) => {
        console.group(action.type);
        const nextState = reducer(state, action);
        console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
        console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
        console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
        console.groupEnd();
        return nextState;
    };
}

export const metaReducers: Array<MetaReducer<any>> = !environment.production ? [logger, storeFreeze] : [];
