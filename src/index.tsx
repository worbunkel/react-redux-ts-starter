import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './app';
import { history, persistor, store } from './state/root-store';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <App store={store} history={history} persistor={persistor} />
  </AppContainer>,
  rootEl,
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').App;

    render(
      <AppContainer>
        <NewApp store={store} history={history} persistor={persistor} />
      </AppContainer>,
      rootEl,
    );
  });
}
