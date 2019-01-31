import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';

export default combineReducers({
  posts: postReducer,
  currentUser: authReducer
});