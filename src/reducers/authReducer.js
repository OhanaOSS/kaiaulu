import { SIGN_OUT, NEW_SIGN_IN, NEW_SIGN_UP_WITH_NEW_FAMILY } from '../actions/types';

const initialState = {
  baseUrl: '',
  currentHeader: {},
  data: {},
  loggedIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_SIGN_IN:
      return {
        ...state,
        loggedIn: true,
        baseUrl: action.baseUrl,
        currentHeader: action.headers,
        data: action.payload
      };
    case NEW_SIGN_UP_WITH_NEW_FAMILY:
      return {
        ...state,
        loggedIn: true,
        baseUrl: action.baseUrl,
        currentHeader: action.headers,
        data: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        loggedIn: false,
        baseUrl: action.baseUrl,
        currentHeader: {},
        data: {}
      };
    default:
      return state;
  }
}