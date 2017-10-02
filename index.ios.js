'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Style, LoginForm } from './component';

export default class captAR extends Component {
  render() {
    return (
      <View style={Style.container}>
        <LoginForm />
      </View>
    )
  }
}

AppRegistry.registerComponent('captAR', () => captAR);
