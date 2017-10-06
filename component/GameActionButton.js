'use strict';

import React, { Component } from 'react';
import firebase from '../firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { Style } from './index';

// default position state set as right-hander
export default class GameActionButtonView extends Component {
  constructor() {
    super();
    this.state = {position: 'right'};
    this.onLogoutPress = this.onLogoutPress.bind(this);
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
      <View style={(this.state.position === 'right') ? Style.actionButtonRight : Style.actionButtonLeft}>
        <ActionButton buttonColor="rgba(231,76,60,1)" position={this.state.position} backgroundTappable={true}>
          <ActionButton.Item buttonColor='#9b59b6' title="Capture" position={this.state.position} onPress={() => this.props.takePicture()}>
            <Icon name="md-radio-button-on" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Message" position={this.state.position} onPress={() => {}}>
            <Icon name="md-mail" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#778899' title="Log Out" position={this.state.position} onPress={() => this.onLogoutPress()}>
          <Icon name="ios-log-out" style={Style.actionButtonIcon} />
        </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}
