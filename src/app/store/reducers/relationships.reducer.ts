import * as fromActions from '../actions';
import * as fromModels from '../models';

export const initialState: fromModels.ApiRelationships = null;

export function relationshipsReducers(state: fromModels.ApiRelationships = initialState, action: any): fromModels.ApiRelationships {
  switch (action.type) {
    case fromActions.UPDATE_RELATIONSHIPS: {
      const newState:fromModels.ApiRelationships = action.payload;
      return {
        ...newState
      };
    }
    case fromActions.CLEAR_RELATIONSHIPS: {
      return null;
    }
    default:
      return state;
  }
};
