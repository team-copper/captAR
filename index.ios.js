'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Map, CameraView, Style } from './component';

export default class captAR extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Map />
        <CameraView />
      </View>
    )
  }
}

AppRegistry.registerComponent('captAR', () => captAR);
