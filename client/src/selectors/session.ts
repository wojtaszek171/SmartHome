import { ApplicationState } from "src/reducers";

export const getAuthToken = (state: ApplicationState) => state.session.authToken;

export const getUsername = (state: ApplicationState) => state.session.username;

export const getFirstName = (state: ApplicationState) => state.session.firstName;

export const getIsTokenValid = (state: ApplicationState) => !!(state.session.authToken.length && state.session.username.length);

export const getLastName = (state: ApplicationState) => state.session.lastName;

export const getIsAdminOpen = (state: ApplicationState) => state.session.isAdminOpen;
