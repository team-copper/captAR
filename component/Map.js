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
import {
  elevatedAcre,
  bowlingGreen,
  batteryPark
} from "../assets/presetGameFields";
import { playerMarkerPath } from "../assets/playerMarkers";
import Uuid from "uuid-lib";
import { Player, Team, Flag } from "../model";
import { getDistanceFromFlagThunk, updatePlayerLocationThunk } from "../store";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      enableCapture: false,
      pressFlag: false,
      displayStatus: "",
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
      flagDistance: 0,
    };

    this.watchPosition = this.watchPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.checkInside = this.checkInside.bind(this);
    this.handleFlagPress = this.handleFlagPress.bind(this);
    this.onCapturePress = this.onCapturePress.bind(this);
    this.onCloseCamera = this.onCloseCamera.bind(this);
    this.onFlagCapture = this.onFlagCapture.bind(this);
  }

  componentDidMount() {
    if (this.props.game.gameId === 1) {
      this.setState({
        gameAreaCoordinates: elevatedAcre.gameAreaCoordinates,
        redCoordinates: elevatedAcre.redCoordinates,
        blueCoordinates: elevatedAcre.blueCoordinates,
      });

    } else if (this.props.game.gameId === 2) {

      this.setState({
        gameAreaCoordinates: bowlingGreen.gameAreaCoordinates,
        redCoordinates: bowlingGreen.redCoordinates,
        blueCoordinates: bowlingGreen.blueCoordinates,
      });

    } else if (this.props.game.gameId === 3) {

      this.setState({
        gameAreaCoordinates: batteryPark.gameAreaCoordinates,
        redCoordinates: batteryPark.redCoordinates,
        blueCoordinates: batteryPark.blueCoordinates,
      });

    }
    this.watchPosition();
    setInterval(this.checkInside, 100);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this.checkInside);
  }

  watchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // redFlag: elevatedAcre.redFlagSpawn[Math.floor(Math.random() * 5)],
          // blueFlag: elevatedAcre.blueFlagSpawn[Math.floor(Math.random() * 5)],
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0.5
      }
    );
  };

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  checkInside = () => {
    if (
      geolib.isPointInCircle(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[0].startLocation, // red team's flag
        2
      )
    ) {
      this.setState({ displayStatus: "Red flag nearby" });
    } else {
      this.setState({ displayStatus: "" });
    }

    if (
      geolib.isPointInCircle(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[1].startLocation, // blue team's flag
        2
      )
    ) {
      this.setState({ displayStatus: "Blue flag nearby" });
    } else {
      this.setState({ displayStatus: "" });
    }

    let team = '';
    let playerHasFlag = false;

    for (let i=0; i<this.props.players.length; i++) {
      if (this.props.localUserKey === this.props.players[i].playerKey) {
        team = this.props.players[i].team
        playerHasFlag = this.props.players[i].hasFlag
      }
    }

    // TEAM WIN LOGIC: if red player has red flag and is inside the red territory, red team wins
    if (
      playerHasFlag === true && team === 'red' && geolib.isPointInside(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        redCoordinates
      )
    ) {
      this.setState({ displayStatus: "Red Team Wins!"})
    } else if (
      playerHasFlag === true && team === 'blue' && geolib.isPointInside(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        blueCoordinates
      )
    ) {
      this.setState({ displayStatus: "Blue Team Wins!"})
    }

  };

  // create CALCULATE_DISTANCE on Flag store and test this part
  // attempted on line 165 and in store > flag.js, line 107
  handleFlagPress = event => {
    // let lat = this.state.latitude,
    //   lng = this.state.longitude;
    // this.props.getDistanceFromFlag(lat, lng, event);
    // this.setState({ pressFlag: !this.state.pressFlag });

    !this.state.pressFlag
      ? this.setState({ pressFlag: true })
      : this.setState({ pressFlag: false });


    this.setState({
    //  flagDistance: getDistanceFromFlagThunk(lat, lng, event)
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

  // Pressing capture on action button
  // CameraView will only render if enableCapture is true
  // This function passed down as props to GameActionButton component

  // Game Logic:
  // Enable flag to be captured only when I am inside a flag circle
  // Don't worry about flag and my team color being same/different now
  // Re: added team logic
  onCapturePress() {

    let team = '';

    for (let i=0; i<this.props.players.length; i++) {
      if (this.props.localUserKey === this.props.players[i].playerKey) {
        team = this.props.players[i].team
      }
    }

    if (
      team === 'red' &&
      geolib.isPointInCircle(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[0].startLocation, // red team's flag
        2
      )
      ||
      team == 'blue' &&
      geolib.isPointInCircle(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        this.props.flags[1].startLocation, // blue team's flag
        2
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
    // and change flag's location to that the user (use playerId)
    // if (flag.flagId === 1 && flag.isTaken === true && player.hasFlag === true)
    // need dispatch here to have flag's location be the same as the holder
    // this.props.flags[0].location = this.props.players[whatever index the player is].location

    let playerTeam = '';

    for (let i=0; i<this.props.players.length; i++) {
      if (this.props.localUserKey === this.props.players[i].playerKey) {
        playerTeam = this.props.players[i].team
      }
    }

    let flagRedTeam = this.props.flags[0].team
    let flagRedId = this.props.flags[0].flagId
    let flagRedLoc = this.props.flags[0].currentLocation.latitude
    let flagBlueTeam = this.props.flags[1].team
    let flagBlueId = this.props.flags[1].flagId
    let flagBlueLoc = this.props.flags[1].currentLocation.latitude

    if (playerTeam === flagRedTeam || playerTeam === flagBlueTeam) {
      // ex: red player on red team captures red flag
      this.setState({
        displayStatus: `${playerTeam}` + " has captured the flag!" ,
        // INSERT THUNK THAT UPDATES FLAG LOCATION as PLAYER LOC

      });
    }

    if ((playerTeam !== flagRedTeam && flagRedLoc !== 0) || (playerTeam !== flagBlueTeam && flagBlueLoc !== 0)) { // && flag's current location is not null
      // ex: red player intercepts blue flag from blue team member
      this.setState({
        displayStatus: `${playerTeam}` + " team has intercepted the flag!" ,
        // THUNK: FLAG LOCATION returns to HOME LOC
        // show 10 second modal to block phone interactions?
      });
    }

  }

  render() {
    const players = this.props.players;
    const flags = this.props.flags;
    const game = this.props.game;
    const myId = players.filter(player => player.playerKey === this.props.localUserKey)[0].playerId
    const firebasePath= 'GameArea' + game.gameId + '/' + game.gameKey + '/players/' + myId;
    console.log(this.props, myId)
    if (this.props.flags.length === 2) {
      // update my location to firebase
      updatePlayerLocationThunk(firebasePath,
        {latitude: this.state.latitude, longitude: this.state.longitude}
      );

      return (
        <View style={Style.container}>
          <MapView
            style={Style.map}
            initialRegion={{
              latitude: 40.703374,
              longitude: -74.008507,
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
              >
                <Image
                  source={playerMarkerPath[index]}
                  style={{ height: 25, width: 25 }}
                />
              </MapView.Marker>
            ))}
            {/* Needs to bind flag coordinate to holder cooridnate */}
            <MapView.Marker
              name="redFlag"
              coordinate={flags[0].startLocation}
              onPress={event => this.handleFlagPress(event)}
            >
              <Image
                source={require("../assets/redFlag.png")}
                style={{ height: 25, width: 25 }}
              />
            </MapView.Marker>
            <MapView.Circle
              name="redFlagCircle"
              center={flags[0].startLocation}
              radius={2}
              fillColor="rgba(200, 0, 0, 0.3)"
            />

            <MapView.Marker
              name="blueFlag"
              coordinate={flags[1].startLocation}
              onPress={event => this.handleFlagPress(event)}
            >
              <Image
                source={require("../assets/blueFlag.png")}
                style={{ height: 25, width: 25 }}
              />
            </MapView.Marker>
            <MapView.Circle
              name="blueFlagCircle"
              center={flags[1].startLocation}
              radius={2}
              fillColor="rgba(0, 0, 200, 0.3)"
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
          <GameActionButtonView
            navigate={this.props.navigate}
            onCapturePress={this.onCapturePress}
            getCurrentPosition={this.getCurrentPosition}
          />
          <View style={Style.selectTextContainer}>
            <Text>
              {this.state.latitude}
              {this.state.longitude}
            </Text>
          </View>
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
    localUserKey: state.authenticated.localUserKey,
    game: state.game
  };
};

const mapDispatchToProps = { getDistanceFromFlagThunk };

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default MapContainer;
