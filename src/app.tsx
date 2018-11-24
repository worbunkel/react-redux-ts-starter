import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './app.scss';

export interface AppProps {
  store: Store<any>;
  persistor: Persistor;
  history: History;
}

export const App = ({ store, persistor, history }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path="*" render={() => <div className="app" />} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);
