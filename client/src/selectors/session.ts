import { ApplicationState } from "src/reducers";

export const getAuthToken = (state: ApplicationState) => state.session.authToken;

export const getUsername = (state: ApplicationState) => state.session.username;
