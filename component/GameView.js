'user strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Style, Map, CameraView } from './index';

export default class GameView extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Map />
        <CameraView />
      </View>
    )
  }
}
