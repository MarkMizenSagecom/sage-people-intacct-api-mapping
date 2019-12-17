import * as fromActions from '../actions';
import * as fromModels from '../../models';

export const initialState: fromModels.ApiRelationship = null;

export function selectedReducers(state: fromModels.ApiRelationship = initialState, action: any): fromModels.ApiRelationship {
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
