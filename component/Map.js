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
import { Style } from "./index";
import { elevatedAcre } from "../assets/presetGameFields";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: 0,
      latitude: 0,
      error: null,
      pressArea: false,
      pressFlag: false,
      gameAreaCoordinates: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 }
      ],
      redCoordinates: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 }
      ],
      blueCoordinates: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0 }
      ],
      redFlag: { latitude: 0, longitude: 0 },
      blueFlag: { latitude: 0, longitude: 0 },
      flagDistance: 0
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.handleAreaPress = this.handleAreaPress.bind(this);
    this.handleFlagPress = this.handleFlagPress.bind(this);
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
          latitude: 40.703374,
          longitude: -74.008507,
          gameAreaCoordinates: elevatedAcre.gameAreaCoordinates,
          redCoordinates: elevatedAcre.redCoordinates,
          blueCoordinates: elevatedAcre.blueCoordinates,

          redFlag: elevatedAcre.redFlagSpawn[Math.floor(Math.random() * 5)],
          blueFlag: elevatedAcre.blueFlagSpawn[Math.floor(Math.random() * 5)],
          error: null
        });
        console.log(
          geolib.isPointInside(
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            },
            this.state.redCoordinates
          )
        );
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
          latitude: 40.703374,
          longitude: -74.008507,
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

  handleFlagPress = event => {
    !this.state.pressFlag
      ? this.setState({ pressFlag: true })
      : this.setState({ pressFlag: false });

    this.setState({
      flagDistance: geolib
        .getDistance(
          { latitude: this.state.latitude, longitude: this.state.longitude },
          {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
          },
          1,
          3
        )
        .toFixed(2)
    });
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
            latitudeDelta: 0.0002305 * 2,
            longitudeDelta: 0.00010525 * 2
          }}
        >
          <MapView.Polygon
            name="gameArea"
            coordinates={this.state.gameAreaCoordinates}
            fillColor="rgba(0, 0, 0, 0.5)"
            onPress={event => this.handleAreaPress(event)}
          />
          <MapView.Polygon
            name="redTeamArea"
            coordinates={this.state.redCoordinates}
            fillColor="rgba(200, 0, 0, 0.1)"
          />
          <MapView.Polygon
            name="blueTeamArea"
            coordinates={this.state.blueCoordinates}
            fillColor="rgba(0, 0, 200, 0.1)"
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

          <MapView.Marker
            name="redFlag"
            coordinate={this.state.redFlag}
            title={"Red Team Flag"}
            onPress={event => this.handleFlagPress(event)}
          >
            <Image
              source={require("../assets/redFlag.png")}
              style={{ height: 25, width: 25 }}
            />
          </MapView.Marker>

          <MapView.Marker
            name="blueFlag"
            coordinate={this.state.blueFlag}
            title={"Blue Team Flag"}
            onPress={event => this.handleFlagPress(event)}
          >
            <Image
              source={require("../assets/blueFlag.png")}
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
