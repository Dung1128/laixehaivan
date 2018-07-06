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

export default combineReducers({
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
