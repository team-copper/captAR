'user strict';

import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { Style } from './index';

// default position state set as right-hander
export default class ActionButtonView extends Component {
  constructor() {
    super();
    this.state = {position: 'right'};
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
          <ActionButton.Item buttonColor='#3498db' title="Log Out" position={this.state.position} onPress={() => this.props.onLogoutPress()}>
          <Icon name="ios-log-out" style={Style.actionButtonIcon} />
        </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}
