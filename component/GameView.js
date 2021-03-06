'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Style, Map, CameraView } from './index';
import { connect } from 'react-redux';

export default class GameView extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={Style.container}>
        <Map navigate={this.props.navigation.navigate} />
      </View>
    )
  }
}
