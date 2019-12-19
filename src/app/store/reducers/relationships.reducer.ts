import * as fromActions from '../actions';
import * as fromModels from '../../models';

export const initialState: any[] = null;

export function relationshipsReducers(state: any[] = initialState, action: any): any[] {
  switch (action.type) {
    case fromActions.UPDATE_RELATIONSHIPS: {
      const newState:any[] = action.payload;
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
