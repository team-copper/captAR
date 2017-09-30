"user strict";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import BackgroundGeolocation from "react-native-background-geolocation";
import { Style } from "./index";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: null,
      latitude: null,
      error: null
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.checkGeofencing = this.checkGeofencing.bind(this);
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
          error: null
        });
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

  checkGeofencing = () => {
    BackgroundGeolocation.on("geofenceschange", function(event) {
      var on = event.on; //<-- new geofences activiated.
      var off = event.off; //<-- geofences that were de-activated.

      // Create map circles
      for (var n = 0, len = on.length; n < len; n++) {
        var geofence = on[n];
        createGeofenceMarker(geofence);
      }

      // Remove map circles
      for (var n = 0, len = off.length; n < len; n++) {
        var identifier = off[n];
        removeGeofenceMarker(identifier);
      }
    });
  };

  render() {
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
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={"Your Location"}
          />
          <View style={{
            marginTop: 30,
          }}>
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
