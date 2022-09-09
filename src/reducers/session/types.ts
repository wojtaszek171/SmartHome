import { Action } from 'redux';

export interface SessionState {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    authToken: string;
    isAdminOpen: boolean;
}

export interface SetSessionData extends Action {
    type: string;
    payload: SessionState;
}
  
export interface ClearSession extends Action {
    type: string;
}

export interface SetAdminOpen extends Action {
    type: string;
    payload: boolean;
}
