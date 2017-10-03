'user strict';

import firebase from '../firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Camera from 'react-native-camera';
import { ActionButtonView, Style } from './index';
import { isLoggedOut } from '../store'

class CameraView extends Component {
  constructor() {
    super();
    this.state = {};
    this.takePicture = this.takePicture.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
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
        <ActionButtonView
          takePicture = {this.takePicture}
          onLogoutPress = {this.onLogoutPress} />
      </Camera>
    )
  }
}

const mapDispatchToProps = { isLoggedOut }
const CameraContainer = connect(null, mapDispatchToProps)(CameraView)

export default CameraContainer;

