import { UPDATE_HEADERS, VALIDATE_TOKEN_SUCESS, VALIDATE_TOKEN_FAILURE, SIGN_OUT, NEW_SIGN_IN, NEW_SIGN_UP_WITH_NEW_FAMILY } from '../actions/types';

const initialState = {
  baseUrl: '',
  currentHeader: {},
  data: {},
  isAuthenticated: false,
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        isLoggedIn: true,
        baseUrl: action.baseUrl,
        currentHeader: action.headers,
        data: action.payload
      };
    case NEW_SIGN_UP_WITH_NEW_FAMILY:
      return {
        ...state,
        isAuthenticated: true,
        isLoggedIn: true,
        baseUrl: action.baseUrl,
        currentHeader: action.headers,
        data: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoggedIn: false,
        currentHeader: {},
        data: {}
      };
    case VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoggedIn: false,
        currentHeader: {}
      };
    case VALIDATE_TOKEN_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoggedIn: true,
        currentHeader: action.headers
      };
    case UPDATE_HEADERS:
      if (action.headers["access-token"] === "") {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          isAuthenticated: true,
          currentHeader: action.headers
        };
      }
    default:
      return state;
  }
}