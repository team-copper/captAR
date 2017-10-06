'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Style, Map, CameraView } from './index';
import { connect } from 'react-redux';

export default class GameView extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Map />
      </View>
    )
  }
}
