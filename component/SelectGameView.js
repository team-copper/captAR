"use strict";

import firebase from "../firebase";
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import geolib from "geolib";
import { Style } from "./index";
import {
  elevatedAcre,
  bowlingGreen,
  batteryPark
} from "../assets/presetGameFields";
import { fetchGameThunk, createFlag, createPlayer } from '../store';
import { connect } from 'react-redux';
import ModalView from './Modal';
import { Player, Team, Flag } from "../model";

class SelectGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: 0,
      latitude: 0,
      error: null,
      pressArea: false,
      showModal: false,
      flags: null,
      areaId: null,
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
    this.modalView = this.modalView.bind(this);
    this.createFlag = this.createFlag.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
    console.log(this.props);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

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
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

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
    this.props.fetchGame(id);
    this.setState({areaId: id});
    this.createFlag(id);
    this.createPlayer();
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
    this.modalView();
  };

  createFlag = (polyId) => {
    const randNum = Math.floor(Math.random()) * 5;
    const redCoordinates = locationArray[polyId].redFlagSpawn[randNum];
    let redFlag = new Flag('red', 1);
    redFlag.startLocation = {
      latitude: redCoordinates.latitude,
      longitude: redCoordinates.longitude
    }
    this.props.createFlag(redFlag)
    const blueCoordinates = locationArray[polyId].blueFlagSpawn[randNum];
    let blueFlag = new Flag('blue', 2);
    blueFlag.startLocation = {
      latitude: blueCoordinates.latitude,
      longitude: blueCoordinates.longitude
    }
    this.props.createFlag(blueFlag)
  }

  createPlayer = () => {
    let player = new Player();
    player.playerKey = this.props.currentPlayerKey;
    player.location = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    player.playerId = this.props.players.length+1;
    player.team = player.playerId%2 ? "red" : "blue"; // for testing, Oscar assign this to 'blue'
    this.props.createPlayer(player);
  }

  modalView = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    if (this.state.latitude) {
      const selectedArea = []
      for (const area in this.state.selectedArea) {
        if (this.state.selectedArea[area] === true) {
          selectedArea.push(area)
        }
      }
      return (
        <View style={Style.container}>
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
          </MapView>
          <View style={Style.selectTextContainer}>
            {(selectedArea.length === 1) ? (
              <Text>
                You have selected: {selectedArea}
              </Text>
            ) :
              <Text>
                Please select one game area to join
              </Text>
            }
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>
          <ModalView isModalVisible={this.state.showModal} modalView={this.modalView} navigate={this.props.navigation.navigate} areaId={this.state.areaId} latitude={this.state.latitude} longitude={this.state.longitude}/>
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
    currentPlayerKey: state.authenticated.localUserKey,
    gameArea: state.game,
    players: state.players
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGame: (polyId) => {
      dispatch(fetchGameThunk(polyId))
    },
    createFlag: flag => {
        dispatch(createFlag(flag))
    },
    createPlayer: player => {
      dispatch(createPlayer(player))
    }
  }
}

const SelectGameViewContainer = connect(mapStateToProps, mapDispatchToProps)(SelectGameView);

export default SelectGameViewContainer;

const locationArray = [ null, elevatedAcre, bowlingGreen, batteryPark ]
