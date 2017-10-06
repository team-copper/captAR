'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Camera from 'react-native-camera';
import { GameActionButtonView, Style } from './index';
import { isLoggedOut } from '../store'

class CameraView extends Component {
  constructor() {
    super();
    this.state = {};
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  onLogoutPress() {
    firebase.auth().signOut()
      .then(() => {
        this.props.isLoggedOut();
        this.props.navigate("LoginForm");
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Camera
        ref={(cam) => { this.camera = cam; }}
        style={Style.cameraPreview}
        aspect={Camera.constants.Aspect.fill}
        orientation={Camera.constants.Orientation.auto}>
        <GameActionButtonView
          takePicture = {this.takePicture}
          onLogoutPress = {this.onLogoutPress} />
      </Camera>
    )
  }
}

const mapDispatchToProps = { isLoggedOut }
const CameraContainer = connect(null, mapDispatchToProps)(CameraView)

export default CameraContainer;

