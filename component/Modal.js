import React, { Component } from "react";
import { ScrollView, FlatList, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Style } from './index';
import { Game, Player } from '../model';
import { createGameThunk, clearPlayer, deleteFlag, clearGame, addPlayerThunk } from '../store';
import { registerGameSubscriptions } from '../subscriptions'

class ModalView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playersArray: []
        }
        this._renderCreateButton = this._renderCreateButton.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
        this._renderJoinButton = this._renderJoinButton.bind(this);
        this.createGame = this.createGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.goBack = this.goBack.bind(this);
        this.clearStore = this.clearStore.bind(this);
        // this.createArray = this.createArray.bind(this);
    }

    //cearStore break into components

    createGame = () => {
        const game = new Game();
        game.gameId = this.props.areaId;
        game.flags = this.props.flags;
        game.players = this.props.players;
        this.props.createGame(game);
        this.props.modalView();
        this.clearStore();
        this.props.navigate("GameView");
    }

    joinGame = () => {
        const areaId = this.props.areaId;
        const player = new Player();
        player.playerKey = this.props.currentPlayerKey;
        player.location = {
            latitude: this.props.latitude,
            longitude: this.props.longitude
        };
        player.playerId = 1;
        player.team = player.playerId%2 ? "blue" : "red";
        this.props.joinGame(areaId, player);
        this.props.modalView();
        this.clearStore();
        this.props.navigate("GameView");
    }

    clearStore = () => {
        this.props.clearPlayer()
        this.props.deleteFlag()
    }

    _renderCreateButton = (text) => (
        <TouchableOpacity onPress={this.createGame}>
          <View style={Style.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

      _renderJoinButton = (text) => (
        <TouchableOpacity onPress={this.joinGame}>
          <View style={Style.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

    _renderModalContent = () => (
        <View style={Style.modalContent}>
            <Item fixedlabel>
                <Text>Have fun playing captAR!</Text>
            </Item>
          {this._renderCreateButton('Create Game') }
          {this._renderJoinButton('Join Game') }
          {/* {this.state.playersArray[0].length 
          ? this._renderJoinButton('Join Game') 
          : <View></View>
          }      */}
        </View>
      );

    goBack = () => {
        this.props.modalView();
        this.clearStore();
    }

    // createArray = () => {
    //     const currentGames = this.props.currentGames;
    //     const keys = Object.keys(currentGames);
    //     const playersArray = keys.map(key => (
    //         currentGames[key].players.length
    //     ))
    //     const gameArray = [keys, playersArray]
    //     console.log(" my array in Modal ", gameArray)
    // }

    render() {
        // console.log('view from modal ', this.props.games)
        const isModalVisible = this.props.isModalVisible;
        // this.createArray();
        return (
            <View>
            <TouchableWithoutFeedback onPress={this.goBack}>
            <Modal
                isVisible={isModalVisible}
                backdropColor={'#336E7B'}
                backdropOpacity={0.9}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                {this._renderModalContent() }
            </Modal>
            </TouchableWithoutFeedback>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentPlayerKey: state.authenticated.localUserKey,
        flags: state.flags,
        players: state.players,
        games: state.game
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGame: game => {
            dispatch(createGameThunk(game))},
        joinGame: (areaId, game) => {
            dispatch(addPlayerThunk(areaId, game))
        },
        clearPlayer,
        deleteFlag
    }
}

const ModalViewContainer = connect(mapStateToProps, mapDispatchToProps)(ModalView);
export default ModalViewContainer;
