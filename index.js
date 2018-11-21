import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'mobx-react/native';
import App from './src/components/App';
import {name as appName} from './app.json';
import currencyStore from './src/store/CurrencyStore';

const Root = () => (
  <Provider currencyStore={currencyStore}>
    <App/>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
