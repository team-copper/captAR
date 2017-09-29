'user strict';

import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { ActionButtonView, Style } from './index';

export default class CameraView extends Component {
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
        <ActionButtonView takePicture = {this.takePicture} />
      </Camera>
    )
  }
}
