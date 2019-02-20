import React from 'react';
import { render } from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();
const persistor = persistStore(store);

render(
  <AppContainer>
    <PersistGate loading={null} persistor={persistor}>
      <Root store={store} history={history} />
    </PersistGate>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <PersistGate loading={null} persistor={persistor}>
          <NextRoot store={store} history={history} />
        </PersistGate>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
