'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider} from 'react-redux'
import { Style, Main, GameView, SelectGameView } from './component';
import store from './store'

class captAR extends Component {
  render() {
    return (
      <Provider store={store}>
      <View style={Style.container}>
        <SelectGameView />
      </View>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('captAR', () => captAR);
