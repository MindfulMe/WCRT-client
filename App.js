import React from 'react';
import Main from './src/index';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}