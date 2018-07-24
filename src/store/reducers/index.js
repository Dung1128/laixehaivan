import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import notification from './notification';
import auth from './auth';
import haivan from './haivan';
import {
  router,
  requests,
  toast,
  modal,
  drawer,
  gallery,
  browser
} from './common';

const appReducer = combineReducers({
  form,
  router,
  notification,
  ui: combineReducers({
    toast,
    modal,
    drawer,
    gallery,
    browser
  }),
  requests,
  auth,
  haivan
});

const rootReducer = (state, action) => {
  if (action.type === 'app/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
