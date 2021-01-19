import { ClearSession, SessionState, SetSessionData } from "./types";
import { ActionCreator, Reducer } from 'redux';

const SESSION_SET = 'SESSION_SET';
const SESSION_CLEAR = 'SESSION_CLEAR';

const defaultState: SessionState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  authToken: ''
}

export const session: Reducer<SessionState> = (state = defaultState, action) => {
    switch (action.type) {
      case SESSION_SET:
        return {
          ...state,
          ...action.payload
        }
      case SESSION_CLEAR:
        return defaultState
      default:
        return state
    }
}

export const setSessionData: ActionCreator<SetSessionData> = (data: SessionState) => ({
  type: SESSION_SET,
  payload: data
});

export const clearSession: ActionCreator<ClearSession> = () => ({
  type: SESSION_CLEAR
});
