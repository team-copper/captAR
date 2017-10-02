"user strict";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Style, gameLogic } from "./index";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: 0,
      latitude: 0,
      error: null,
      polyCoordinates: [
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
      ]
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,

          polyCoordinates: [
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude - 0.002
            },
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude + 0.002
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude + 0.002
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude - 0.002
            }
          ],

          redCoordinates: [
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude - 0.002
            },
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude - 0.002
            }
          ],

          blueCoordinates: [
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude
            },
            {
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude + 0.002
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude + 0.002
            },
            {
              latitude: position.coords.latitude - 0.001,
              longitude: position.coords.longitude
            }
          ],
          error: null
        });
        console.log(
          gameLogic.checkInside(this.state.polyCoordinates, {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }),
          this.state.polyCoordinates
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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

  render() {
    // console.log(this.state.latitude, 'latitude');
    if (this.state.latitude) {
      return (
        <MapView
          style={Style.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Polygon
            name="gameArea"
            coordinates={this.state.polyCoordinates}
            fillColor="rgba(0, 0, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={3}
          />
          <MapView.Polygon
            name="redTeamArea"
            coordinates={this.state.redCoordinates}
            fillColor="rgba(200, 0, 0, 0.2)"
            strokeColor="rgba(0,0,0,0.1)"
            strokeWidth={3}
          />
          <MapView.Polygon
            name="blueTeamArea"
            coordinates={this.state.blueCoordinates}
            fillColor="rgba(0, 0, 200, 0.2)"
            strokeColor="rgba(0,0,0,0.1)"
            strokeWidth={3}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={"Your Location"}
          />
          <View
            style={{
              marginTop: 30
            }}
          >
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
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
