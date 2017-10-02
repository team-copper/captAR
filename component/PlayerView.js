'user strict';

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Style, Map, CameraView } from './component';

export default class PlayerView extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Map />
        <CameraView />
      </View>
    )
  }
}

AppRegistry.registerComponent('PlayerView', () => PlayerView);
