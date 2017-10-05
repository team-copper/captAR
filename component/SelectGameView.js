"use strict";

import firebase from "../firebase";
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import geolib from "geolib";
import { Style, ActionButtonView } from "./index";
import {
  elevatedAcre,
  bowlingGreen,
  batteryPark
} from "../assets/presetGameFields";

export default class SelectGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: 0,
      latitude: 0,
      error: null,
      pressArea: false,
      selectedAra: 0,
      elevatedAcreCoordinates: [{ latitude: 0, longitude: 0 }],
      bowlingGreenCoordinates: [{ latitude: 0, longitude: 0 }],
      batteryParkCoordinates: [{ latitude: 0, longitude: 0 }]
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.handleAreaPress = this.handleAreaPress.bind(this);
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  // saveToFirebaseDB(payload) {
  //   const newMsgRef = firebase
  //     .database()
  //     .ref("messages")
  //     .push();
  //   payload.id = newMsgRef.key;
  //   newMsgRef.set(payload);
  // }

  getCurrentPosition = () => {
    let msg;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          elevatedAcreCoordinates: elevatedAcre.gameAreaCoordinates,
          bowlingGreenCoordinates: bowlingGreen.gameAreaCoordinates,
          batteryParkCoordinates: batteryPark.gameAreaCoordinates,
          error: null
        });
        // console.log(
        //   geolib.isPointInside({latitude: this.state.latitude,
        //     longitude: this.state.longitude},
        //     this.state.redCoordinates
        //   )
        // );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     this.saveToFirebaseDB(this.state);
    //   });
  };

  watchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };

  handleAreaPress = event => {
    console.log(event.nativeEvent);
    !this.state.pressArea
      ? this.setState({ pressArea: true })
      : this.setState({ pressArea: false });
  };

  render() {
    if (this.state.latitude) {
      // this.saveToFirebaseDB(this.state);
      return (
        <MapView
          style={Style.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.02305 * 0.7,
            longitudeDelta: 0.0105258 * 0.7
          }}
        >
          <MapView.Polygon
            name="elevatedAcre"
            coordinates={this.state.elevatedAcreCoordinates}
            fillColor={this.state.pressArea ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event)}
          />

          <MapView.Polygon
            name="bowlingGreen"
            coordinates={this.state.bowlingGreenCoordinates}
            fillColor={this.state.pressArea ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event)}
          />

          <MapView.Polygon
            name="batteryPark"
            coordinates={this.state.batteryParkCoordinates}
            fillColor={this.state.pressArea ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event)}
          />

          <MapView.Marker
            name="currentLocation"
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={"Your Location"}
          >
            <Image
              source={require("../assets/person.png")}
              style={{ height: 25, width: 25 }}
            />
          </MapView.Marker>

          <View
            style={{
              marginTop: 25
            }}
          >
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.pressArea ? (
              <Text>You have selected game area</Text>
            ) : null}
            {this.state.pressFlag ? (
              <Text>
                You are {this.state.flagDistance}m away from that flag
              </Text>
            ) : null}
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>
        </MapView>
      );
    } else {
      return (
        <View>
          <Text>Enable GPS</Text>
        </View>
      );
    }
  }
}
