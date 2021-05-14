import { ClearSession, SessionState, SetAdminOpen, SetSessionData } from "./types";
import { ActionCreator, Reducer } from 'redux';

const SESSION_SET = 'SESSION_SET';
const SESSION_CLEAR = 'SESSION_CLEAR';
const SESSION_ADMIN_OPEN = 'SESSION_ADMIN_OPEN';

const defaultState: SessionState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  authToken: '',
  isAdminOpen: false
};

export const session: Reducer<SessionState> = (state = defaultState, action) => {
    switch (action.type) {
      case SESSION_SET:
        return {
          ...state,
          ...action.payload
        }
      case SESSION_CLEAR:
        return defaultState
      case SESSION_ADMIN_OPEN:
        return {
          ...state,
          isAdminOpen: action.payload
        }
      default:
        return state
    }
};

export const setSessionData: ActionCreator<SetSessionData> = (data: SessionState) => ({
  type: SESSION_SET,
  payload: data
});

export const clearSession: ActionCreator<ClearSession> = () => ({
  type: SESSION_CLEAR
});

export const openAdmin: ActionCreator<SetAdminOpen> = (open: boolean) => ({
  type: SESSION_ADMIN_OPEN,
  payload: open
});
