const SESSION_SET = 'SESSION_SET';
const SESSION_CLEAR = 'SESSION_CLEAR';

const defaultState = {
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  authToken: null
}

export const session = (state = defaultState, action) => {
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

export const setSessionData = (data) => ({
  type: SESSION_SET,
  payload: data
});

export const clearSession = () => ({
  type: SESSION_CLEAR
});
