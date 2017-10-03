'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider} from 'react-redux'
import { Style, Main } from './component';
import store from './store'

class captAR extends Component {
  render() {
    return (
      <Provider store={store}>
      <View style={Style.container}>
        <Main />
      </View>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('captAR', () => captAR);
