import {
  SET_SESSION_ID,
  SET_ACCOUNT_DETAILS,
  SET_AUTH_ERROR,
  LOGOUT,
} from '../actions/auth';

const initialState = {
  sessionId: null,
  accountDetails: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case SET_ACCOUNT_DETAILS:
      return {
        ...state,
        accountDetails: action.payload,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
