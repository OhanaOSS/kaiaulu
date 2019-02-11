import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postReducer from './postReducer';
import authReducer from './authReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  posts: postReducer,
  currentUser: authReducer
});

export default rootReducer