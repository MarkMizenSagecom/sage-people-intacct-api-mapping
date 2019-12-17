import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export const GET_INTACCT_PROPERTIES = '[Intacct API] Get properties';
export const GET_INTACCT_PROPERTIES_SUCCESS = '[Intacct API] Get properties Success';
export const GET_INTACCT_PROPERTIES_FAIL = '[Intacct API] Get properties Fail';

export class GetIntacctProperties implements Action {
  readonly type = GET_INTACCT_PROPERTIES;
  constructor() { }
}

export class GetIntacctPropertiesSuccess implements Action {
  readonly type = GET_INTACCT_PROPERTIES_SUCCESS;
  constructor(
    public payload: fromModels.ApiProperties
  ) { }
}

export class GetIntacctPropertiesSuccessFail implements Action {
  readonly type = GET_INTACCT_PROPERTIES_FAIL;
  constructor(public payload: { error: string }) { }
}



export const GET_PEOPLE_PROPERTIES = '[People API] Get properties';
export const GET_PEOPLE_PROPERTIES_SUCCESS = '[People API] Get properties Success';
export const GET_PEOPLE_PROPERTIES_FAIL = '[People API] Get properties Fail';

export class GetPeopleProperties implements Action {
  readonly type = GET_PEOPLE_PROPERTIES;
  constructor() { }
}

export class GetPeoplePropertiesSuccess implements Action {
  readonly type = GET_PEOPLE_PROPERTIES_SUCCESS;
  constructor(
    public payload: fromModels.ApiProperties
  ) { }
}

export class GetPeoplePropertiesSuccessFail implements Action {
  readonly type = GET_PEOPLE_PROPERTIES_FAIL;
  constructor(public payload: { error: string }) { }
}
