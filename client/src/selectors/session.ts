import { ApplicationState } from "src/reducers";

export const getAuthToken = (state: ApplicationState) => state.session.authToken;

export const getUsername = (state: ApplicationState) => state.session.username;

export const getFirstName = (state: ApplicationState) => state.session.firstName;

export const getLastName = (state: ApplicationState) => state.session.lastName;
