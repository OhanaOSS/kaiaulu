import { NEW_SIGN_IN } from '../actions/types';

const initialState = {
  baseUrl: '',
  currentHeader: {},
  data: {}
};

export default function(state = initialState, action) {
  console.log("bam");
  switch (action.type) {
    case NEW_SIGN_IN:
    console.log("boom");
    console.log(action);
    console.log(state);
      return {
        ...state,
        baseUrl: action.baseUrl,
        currentHeader: action.headers,
        data: action.payload
      };
    default:
      return state;
  }
}