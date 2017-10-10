"use strict";

import React, { Component } from "react";
import firebase from "../firebase";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { Style } from "./index";

// default position state set as right-hander
export default class SelectGameActionButtonView extends Component {
  constructor() {
    super();
    this.state = { position: "right" };
    this.onCreateGamePress = this.onCreateGamePress.bind(this);
    this.onJoinGamePress = this.onJoinGamePress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }

  onCreateGamePress() {
    // creates game session upon pressed
  }

  onJoinGamePress() {
    // joins game session upon pressed
  }

  onLogoutPress() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.isLoggedOut();
        this.props.navigate("OAuthLoginForm");
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
            buttonColor="#008000"
            title="Create Game"
            position={this.state.position}
            onPress={() => this.onCreateGamePress()}
          >
            <Icon name="ios-flag-outline" style={Style.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#FFD700"
            title="Join Game"
            position={this.state.position}
            onPress={() => this.onJoinGamePress()}
          >
            <Icon name="md-walk" style={Style.actionButtonIcon} />
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
