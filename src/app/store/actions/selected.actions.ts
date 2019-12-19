import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export const GET_SELECTED = '[Selected] Get';
export const UPDATE_SELECTED = '[Selected] Update';
export const CLEAR_SELECTED = '[Selected] Clear';

export class GetSelected implements Action {
  readonly type = GET_SELECTED;
  constructor() { }
}

export class UpdateSelected implements Action {
  readonly type = UPDATE_SELECTED;
  constructor(
    public payload: any
  ) { }
}

export class ClearSelected implements Action {
  readonly type = CLEAR_SELECTED;
  constructor() { }
}
