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
import { connect } from "react-redux";
import MapView from "react-native-maps";
import geolib from "geolib";
import { Style, GameActionButtonView, CameraView } from "./index";
import { elevatedAcre, bowlingGreen, batteryPark } from "../assets/presetGameFields";
import { playerMarkerPath } from "../assets/playerMarkers";
import Uuid from "uuid-lib";
import { Player, Team, Flag } from "../model";
import {
  createFlagThunk,
  createPlayerThunk,
  getDistanceFromFlagThunk
} from "../store";

// Parent - Child Component Order:
// Map -> GameActionButton -> Camera

// Rename to UserGameView?
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameSessionId: null,
      longitude: 0,
      latitude: 0,
      error: null,
      enableCapture: false,
      // Add playerId and team to each user's local state?
      pressFlag: false, // redux state? I am not so sure.
      displayStatus: "", // redux state. Don't worry about this now.
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
    // when flag is captured and bound to a player,
    // flag is redux state (flag coordinates === player.location)
      // redFlag: { latitude: 0, longitude: 0 },
      // redFlagCircle: { latitude: 0, longitude: 0 },
      // blueFlag: { latitude: 0, longitude: 0 },
      // blueFlagCircle: { latitude: 0, longitude: 0 },
      flagDistance: 0
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.handleFlagPress = this.handleFlagPress.bind(this);
    this.onCapturePress = this.onCapturePress.bind(this);
    this.onCloseCamera = this.onCloseCamera.bind(this);
    this.onFlagCapture = this.onFlagCapture.bind(this);
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
          gameSessionId: Uuid.create(),
          latitude: 40.703374,
          longitude: -74.008507,
          gameAreaCoordinates: elevatedAcre.gameAreaCoordinates,
          redCoordinates: elevatedAcre.redCoordinates,
          blueCoordinates: elevatedAcre.blueCoordinates,
          // redFlag: elevatedAcre.redFlagSpawn[Math.floor(Math.random() * 5)],
          // blueFlag: elevatedAcre.blueFlagSpawn[Math.floor(Math.random() * 5)],
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Note: When I comment the below out, Map.js loads as a blue background
    let redFlag = new Flag();
    redFlag.setHomeLocation(
      this.props.flags[0].location.latitude,
      this.props.flags[0].location.longitude,
    );
    redFlag.gameSessionId = this.state.gameSessionId;
    console.log("*****", redFlag);
    createFlagThunk(redFlag);

    let blueFlag = new Flag();
    blueFlag.setHomeLocation(
      this.props.flags[1].location.latitude,
      this.props.flags[1].location.longitude,
    );
    blueFlag.gameSessionId = this.state.gameSessionId;
    createFlagThunk(blueFlag);

    let player = new Player();
    player.setPosition(this.state.latitude, this.state.longitude);
    player.gameSessionId = this.state.gameSessionId;
    player.playerId = Uuid.create();
    player.teamColor = "red"; // for testing, Oscar assign this to 'blue'
    console.log("*****player thunk", player);
    createPlayerThunk(player);
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

  // create CALCULATE_DISTANCE on Flag store and test this part
    // attempted on line 165 and in store > flag.js, line 107
  handleFlagPress = event => {

    let lat = this.state.latitude, lng = this.state.longitude

    !this.state.pressFlag
      ? this.setState({ pressFlag: true })
      : this.setState({ pressFlag: false });
      
    this.props.getDistanceFromFlag(lat, lng, event)

    this.setState({pressFlag: !this.state.pressFlag})

    // this.setState({
    //  flagDistance: getDistanceFromFlagThunk(lat, lng, event)
    //   // flagDistance: geolib
    //   //   .getDistance(
    //   //     { latitude: this.state.latitude, longitude: this.state.longitude },
    //   //     {
    //   //       latitude: event.nativeEvent.coordinate.latitude,
    //   //       longitude: event.nativeEvent.coordinate.longitude
    //   //     },
    //   //     1,
    //   //     3
    //   //   )
    //   //   .toFixed(2)
    // });
  };

  // Pressing capture on action button
  // CameraView will only render if enableCapture is true
  // This function passed down as props to GameActionButton component

  // Game Logic:
  // Enable flag to be captured only when I am inside a flag circle
  // Don't worry about flag and my team color being same/different now
  onCapturePress() {
    // Note: added a 1.5m radius to each flag's circle; increase if necessary
    if ( // red team &&
      geolib.isPointInside(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[0].location, // red team's flag
        1.5
      ) || // blue team &&
      geolib.isPointInside(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[1].location, // blue team's flag
        1.5
      )
    ) {
      this.setState({ enableCapture: true });
    }
  }

  // Closing render of cameraview component
  // This is passed down as props to Camera component
  onCloseCamera() {
    this.setState({ enableCapture: false });
  }

  // Pressing AR image on Camera
  // This is passed down as props to Camera component
  onFlagCapture(player, flag) {
    // if user's team is the same as the flag's (e.g., this.state.team === this.props.flags.team === 'red', then
      // if (this.state.team === this.props.flags.flagId)
    this.setState({ displayStatus: "Jordan has captured the flag!" });
    // and change flag's location to that the user (use playerId)
      // if (flag.flagId === 1 && flag.isTaken === true && player.hasFlag === true)
        // need dispatch here to have flag's location be the same as the holder
        // this.props.flags[0].location = this.props.players[whatever index the player is].location

  }

  render() {
    const players = this.props.players;
    const flags = this.props.flags;

    if (flags[0].location.latitude !== 0) {
      // this.saveToFirebaseDB(this.state);
      return (
        <View style={Style.container}>
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

            {/* Render every player on map */}
            {players.map((player, index) => (

              <MapView.Marker
                name={player.playerId}
                key={player.playerId}
                coordinate={player.location}
                title={index.toString()}
              >
                <Image
                  source={{uri: playerMarkerPath[index]}}
                  style={{ height: 25, width: 25 }}
                />
              </MapView.Marker>
            ))}

            {/* Needs to bind flag coordinate to holder cooridnate */}
            <MapView.Marker
              name="redFlag"
              coordinate={flags[0].location}
              onPress={event => this.handleFlagPress(event)}
            >
              <Image
                source={require("../assets/redFlag.png")}
                style={{ height: 25, width: 25 }}
              />
            </MapView.Marker>
            <MapView.Circle
              name="redFlagCircle"
              center={flags[0].location}
              radius={1.5}
              fillColor="rgba(200, 0, 0, 0.3)"
            />

            <MapView.Marker
              name="blueFlag"
              coordinate={flags[1].location}
              onPress={event => this.handleFlagPress(event)}
            >
              <Image
                source={require("../assets/blueFlag.png")}
                style={{ height: 25, width: 25 }}
              />
            </MapView.Marker>
            <MapView.Circle
              name="blueFlagCircle"
              center={flags[1].location}
              radius={1.5}
              fillColor="rgba(200, 0, 0, 0.3)"
            />
          </MapView>

          {/* display bar in the middle of the view */}
          <View style={Style.displayBar}>
            {this.state.pressFlag ? (
              <Text style={Style.displayFont}>
                You are {this.state.flagDistance}m away from that flag
              </Text>
            ) : (
              <Text style={Style.displayFont}>{this.state.displayStatus}</Text>
            )}
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>

          {/* enable/disable cameraview component and passing props */}
          {this.state.enableCapture ? (
            <CameraView
              onCloseCamera={this.onCloseCamera}
              onFlagCapture={this.onFlagCapture}
            />
          ) : null}

          {/* enable/disable cameraview component and passing props */}
          <GameActionButtonView onCapturePress={this.onCapturePress} />
        </View>
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

const mapStateToProps = state => {
  return { 
    players: state.players,
    flags: state.flags,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDistanceFromFlag: (lat, lng, event) => {
      const action = getDistanceFromFlagThunk()
      dispatch(action)
    }
  }
}

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default MapContainer;
