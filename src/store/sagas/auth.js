import { takeLatest, all, put } from 'redux-saga/effects';
import { APP_LOGIN, APP_LOGOUT } from '../../constants/types';
import auth from '../api/auth';
import { resetTo, closeDrawer, forwardTo, setToast } from '../actions/common';
import {
  setAuthState,
  removeLoggedUser,
  saveLoggedToken
} from '../actions/auth';
import { createRequestSaga } from './common';

const requestLogin = createRequestSaga({
  request: auth.login,
  key: 'login',
  cancel: APP_LOGOUT,
  success: [
    data => saveLoggedToken(data),
    () => setAuthState(true),
    () => forwardTo('chuyenDiCuaBan')
  ],
  failure: [() => setToast('Please check your account and password.', 'danger')]
});

const requestLoginFacebook = createRequestSaga({
  request: auth.facebookLogin,
  key: 'facebookLogin',
  cancel: APP_LOGOUT,
  success: [],
  failure: [() => setToast("Couldn't login", 'danger')]
});

const requestLoginGoogle = createRequestSaga({
  request: auth.googleLogin,
  key: 'googleLogin',
  cancel: APP_LOGOUT,
  success: [],
  failure: [() => setToast("Couldn't login", 'danger')]
});

const requestRegisterAccount = createRequestSaga({
  request: auth.registerAccount,
  key: 'registerAccount',
  cancel: APP_LOGOUT,
  success: [],
  failure: [() => setToast("Couldn't register", 'danger')]
});

const requestDisconnectFCM = createRequestSaga({
  request: auth.disconnectFCM,
  key: 'disconnectFCM',
  success: [],
  failure: []
});

const requestLogout = function*() {
  yield all([
    yield put(removeLoggedUser()),
    yield put(setAuthState(false)),
    yield put(closeDrawer()),
    yield put(resetTo('login'))
  ]);
};

// root saga reducer
export default [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  // other watcher may be background workers
  function* fetchWatcher() {
    // use takeLatest instead of take every,
    //so double click in short time will not trigger more fork
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_LOGOUT, requestLogout),
      takeLatest('app/facebookLogin', requestLoginFacebook),
      takeLatest('app/googleLogin', requestLoginGoogle),
      takeLatest('app/registerAccount', requestRegisterAccount),
      takeLatest('app/disconnectFCM', requestDisconnectFCM)
    ]);
  }
];
