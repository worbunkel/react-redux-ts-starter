import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';
import './app.scss';
import { NavBar } from './state/nav-bar/nav-bar.component';
import { SalesForecastPage } from './state/pages/sales-forecast/sales-forecast.component';

export interface AppProps {
  store: Store<any>;
  history: History;
}

export const App = ({ store, history }: AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => (
            <div className="app">
              <NavBar key={'nav-bar'} />
              <SalesForecastPage key={'sales-forecast-page'} />
            </div>
          )}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
);
