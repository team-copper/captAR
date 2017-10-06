'use strict';

import React, { Component } from 'react';
import firebase from "../firebase";
import { connect } from 'react-redux'
import Camera from 'react-native-camera';
import { Style } from './index';
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

  render() {
    return (
      <Camera
        ref={(cam) => { this.camera = cam; }}
        style={Style.cameraPreview}
        aspect={Camera.constants.Aspect.fill}
        orientation={Camera.constants.Orientation.auto}>
      </Camera>
    )
  }
}

const mapDispatchToProps = { isLoggedOut }
const CameraContainer = connect(null, mapDispatchToProps)(CameraView)

export default CameraContainer;

