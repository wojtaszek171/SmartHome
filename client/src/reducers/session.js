const SESSION_SET = 'SESSION_SET';

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
      default:
        return state
    }
}

export const setSessionData = (data) => ({
  type: SESSION_SET,
  payload: data
});
