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
      selectedArea: {
        elevatedAcre: false,
        bowlingGreen: false,
        batteryPark: false,
      },
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

  handleAreaPress = (event, id) => {
    console.log(id, 'selected polygon Id');
    // id === 1 : elevatedAcre
    // id === 2 : bowlingGreen
    // id === 3 : batteryPark
    if (id === 1)
      this.setState((state) => {
        (!this.state.selectedArea.elevatedAcre)
          ? state.selectedArea.elevatedAcre = true
          : state.selectedArea.elevatedAcre = false
        return state
      });
    if (id === 2)
      this.setState((state) => {
        (!this.state.selectedArea.bowlingGreen)
          ? state.selectedArea.bowlingGreen = true
          : state.selectedArea.bowlingGreen = false
        return state
      });
    if (id === 3)
      this.setState((state) => {
        (!this.state.selectedArea.batteryPark)
          ? state.selectedArea.batteryPark = true
          : state.selectedArea.batteryPark = false
        return state
      });
  };

  render() {
    if (this.state.latitude) {
      // this.saveToFirebaseDB(this.state);
      console.log(this.state.selectedArea);
      const selectedArea = []
      for (const area in this.state.selectedArea) {
        if (this.state.selectedArea[area] === true) {
          selectedArea.push(area)
        }
      }
      console.log(selectedArea);

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
            fillColor={this.state.selectedArea.elevatedAcre ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event, 1)}
          />

          <MapView.Polygon
            name="bowlingGreen"
            coordinates={this.state.bowlingGreenCoordinates}
            fillColor={this.state.selectedArea.bowlingGreen ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event, 2)}
          />

          <MapView.Polygon
            name="batteryPark"
            coordinates={this.state.batteryParkCoordinates}
            fillColor={this.state.selectedArea.batteryPark ? "rgba(255, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)"}
            onPress={event => this.handleAreaPress(event, 3)}
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
            {(selectedArea.length === 1) ? (
              <Text>
                You have selected: {selectedArea}. Please join the game.
              </Text>
            ) :
              <Text>
                Please select one game area to join.
              </Text>
            }
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
