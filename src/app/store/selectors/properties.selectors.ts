import * as fromApp from '../reducers/app.state';

export const selectPeople = (state: fromApp.AppState) => state.people;
export const selectPeopleProperties = (state: fromApp.AppState) => state.people.data;
export const selectPeopleLoading = (state: fromApp.AppState) => state.people.loading;

export const selectIntacct = (state: fromApp.AppState) => state.intacct;
export const selectIntacctProperties = (state: fromApp.AppState) => state.intacct.data;
export const selectIntacctLoading = (state: fromApp.AppState) => state.intacct.loading;
