import { FETCH_MEMBERS, SET_AUTH_FAMILY_MEMBERS } from '../actions/types';

const initialState = {
  items: [],
  familyMembers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEMBERS:
      return {
        ...state,
        items: action.payload
      };
    case SET_AUTH_FAMILY_MEMBERS:
      return {
        ...state,
        familyMembers: action.payload
      };
    default:
      return state;
  }
}