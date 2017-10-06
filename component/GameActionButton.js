"use strict";

import React, { Component } from "react";
import firebase from "../firebase";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { Style } from "./index";

// default position state set as right-hander
export default class GameActionButtonView extends Component {
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
        this.props.isLoggedOut();
        this.props.navigate("LoginForm");
      })
      .catch(error => console.log(error));
  }

  render() {
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
        >
          <ActionButton.Item
            buttonColor="#1E90FF"
            title="Capture"
            position={this.state.position}
            onPress={() => this.props.onCapturePress()}
          >
            <Icon name="md-radio-button-on" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#FF6347"
            title="Message"
            position={this.state.position}
            onPress={() => this.onMessagePress()}
          >
            <Icon name="md-mail" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#778899"
            title="Log Out"
            position={this.state.position}
            onPress={() => this.onLogoutPress()}
          >
            <Icon name="ios-log-out" style={Style.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
