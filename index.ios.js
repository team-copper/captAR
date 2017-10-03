'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Style, LoginForm, GameView } from './component';

export default class captAR extends Component {
  render() {
    return (
      <View style={Style.container}>
        <GameView />
      </View>
    )
  }
}

AppRegistry.registerComponent('captAR', () => captAR);
