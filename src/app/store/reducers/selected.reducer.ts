import * as fromActions from '../actions';
import * as fromModels from '../../models';

export const initialState: any = null;

export function selectedReducers(state: any = initialState, action: any): any {
  switch (action.type) {
    case fromActions.UPDATE_SELECTED: {
      return {
        ...state,
      };
    }
    case fromActions.CLEAR_SELECTED: {
      return null;
    }
    default:
      return state;
  }
};
