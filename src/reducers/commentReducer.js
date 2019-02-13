import { FETCH_COMMENTS_BY_URL } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_BY_URL:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}