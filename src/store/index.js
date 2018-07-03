import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import reducers from './reducers';
import rootSaga from './sagas';

const initState = {};
const encryptor = createEncryptor({
  secretKey: 'haivan'
});
const saga = createSagaMiddleware();
const middlewares = [saga];
if (__DEV__) {
  !window.devToolsExtension && middlewares.push(require('./logger').default);
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
export const configStore = callback => {
  const enhancer = [autoRehydrate(), applyMiddleware(...middlewares)];
  window.devToolsExtension && enhancer.push(window.devToolsExtension());

  const store = createStore(reducers, initState, compose(...enhancer));
  saga.run(rootSaga);
  persistStore(
    store,
    {
      storage: AsyncStorage,
      keyPrefix: 'haivanProject',
      debounce: 500,
      blacklist: ['form', 'ui', 'requests', 'toast'],
      transforms: [encryptor]
    },
    () => callback(store)
  );
};
