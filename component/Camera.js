'use strict';

import React, { Component } from 'react';
import firebase from "../firebase";
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Camera from 'react-native-camera';
import { Style } from './index';
import { isLoggedOut } from '../store'

class CameraView extends Component {
  constructor() {
    super();
    this.onFlagARPress = this.onFlagARPress.bind(this);
  }

  onFlagARPress() {
    // change flag status and display message on display bar on Map
    this.props.onFlagCapture();
  }

  render() {
    return (
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={Style.cameraPreview}
          aspect={Camera.constants.Aspect.fill}
          orientation={Camera.constants.Orientation.auto}>

          <TouchableOpacity onPress={this.props.onCloseCamera}>
            <Text style={Style.closeCameraContainer}> X</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onFlagARPress()}>
            <Image
              style={Style.flagAR}
              source={require("../assets/redFlag.png")} />
          </TouchableOpacity>

        </Camera>
    )
  }
}

const mapDispatchToProps = { isLoggedOut }
const CameraContainer = connect(null, mapDispatchToProps)(CameraView)

export default CameraContainer;

