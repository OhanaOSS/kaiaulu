import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const initialState = {};

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer(history),
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
  )
);

export default store;
