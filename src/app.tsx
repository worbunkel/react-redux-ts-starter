import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Store } from 'redux';
import './assets/scss/App.scss';
import { UsersContainer } from './state/users/users.component';

export interface AppProps {
  store: Store<any>;
  history: History;
}

export class App extends React.Component<AppProps> {
  render() {
    const { store, history } = this.props;
    console.log({
      store,
      history,
      Provider,
      ConnectedRouter,
      Route,
      UsersContainer,
    });
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact={true} path="/" render={() => <UsersContainer />} />
        </ConnectedRouter>
      </Provider>
    );
  }
}
