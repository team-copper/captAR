"use strict";

import React, { Component } from "react";
import firebase from "../firebase";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { connect } from 'react-redux'
import { Style } from "./index";
import { isLoggedOut } from '../store'

// default position state set as right-hander
class GameActionButtonView extends Component {
  constructor() {
    super();
    this.state = { position: "right" };

    this.onMessagePress = this.onMessagePress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }

  onMessagePress() {
    // message feature to go here.
    console.log('message');
  }

  onLogoutPress() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // identify user to logout.
        this.props.isLoggedOut(this.props.localUserKey);
        this.props.navigate("OAuthLoginForm");
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log('props in GameActionButton ', this.props)
    return (
      <View
        style={
          this.state.position === "right"
            ? Style.actionButtonRight
            : Style.actionButtonLeft
        }
      >
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position={this.state.position}
          backgroundTappable={true}
          useNativeFeedback={true}
        >
          <ActionButton.Item
            buttonColor="#1E90FF"
            title="Capture"
            position={this.state.position}
            useNativeFeedback={true}
            onPress={() => this.props.onCapturePress()}
          >
            <Icon name="ios-flag" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#FF6347"
            title="Current Location"
            position={this.state.position}
            useNativeFeedback={true}
            onPress={() => this.props.getCurrentPosition()}
          >
            <Icon name="ios-locate-outline" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#778899"
            title="Log Out"
            position={this.state.position}
            useNativeFeedback={true}
            onPress={() => this.onLogoutPress()}
          >
            <Icon name="ios-log-out" style={Style.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      localUserKey: state.authenticated.localUserKey
  }
}

const mapDispatchToProps = { isLoggedOut }

const GameActionButtonViewContainer = connect(mapStateToProps, mapDispatchToProps)(GameActionButtonView)
export default GameActionButtonViewContainer;
