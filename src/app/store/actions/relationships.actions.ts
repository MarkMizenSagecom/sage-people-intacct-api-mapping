import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export const GET_RELATIONSHIPS = '[Relationships] Get';
export const UPDATE_RELATIONSHIPS = '[Relationships] Update';
export const CLEAR_RELATIONSHIPS = '[Relationships] Clear';

export class GetRelationships implements Action {
  readonly type = GET_RELATIONSHIPS;
  constructor() { }
}

export class UpdateRelationships implements Action {
  readonly type = UPDATE_RELATIONSHIPS;
  constructor(
    public payload: any[]
  ) { }
}

export class ClearRelationships implements Action {
  readonly type = CLEAR_RELATIONSHIPS;
  constructor() { }
}
