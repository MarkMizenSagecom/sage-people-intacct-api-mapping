import * as fromActions from '../actions';
import * as fromModels from '../../models';

export const initialState: fromModels.ApiRelationship[] = null;

export function relationshipsReducers(state: fromModels.ApiRelationship[] = initialState, action: any): fromModels.ApiRelationship[] {
  switch (action.type) {
    case fromActions.UPDATE_RELATIONSHIPS: {
      const newState:fromModels.ApiRelationship[] = action.payload;
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
