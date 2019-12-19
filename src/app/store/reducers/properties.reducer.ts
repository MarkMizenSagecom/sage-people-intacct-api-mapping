import * as fromActions from '../actions';
import * as fromModels from '../../models';


export interface PropertiesState {
  data: any,
  loading: boolean,
  error: string | null,
}

export const initialState: PropertiesState = {
  data: null,
  loading: false,
  error: null,
};

export function intacctReducers(state: PropertiesState = initialState, action: any): PropertiesState {
  switch (action.type) {
    case fromActions.GET_INTACCT_PROPERTIES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.GET_INTACCT_PROPERTIES_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          loading: false
      };
    }
    case fromActions.GET_INTACCT_PROPERTIES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error
      };
    }
    default:
      return state;
  }
};

export function peopleReducers(state: PropertiesState = initialState, action: any): PropertiesState {
  switch (action.type) {
    case fromActions.GET_PEOPLE_PROPERTIES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.GET_PEOPLE_PROPERTIES_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          loading: false
      };
    }
    case fromActions.GET_PEOPLE_PROPERTIES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error
      };
    }
    default:
      return state;
  }
}
