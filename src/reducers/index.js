import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postReducer from './postReducer';
import authReducer from './authReducer';
import memberReducer from './memberReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  posts: postReducer,
  currentUser: authReducer,
  members: memberReducer
});

export default rootReducer