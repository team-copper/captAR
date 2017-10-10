import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Style } from './index';
import { Game } from '../model';
import { createGameThunk } from '../store';

class ModalView extends Component {

    constructor(props) {
        super(props)
        this._renderButton = this._renderButton.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    createGame = () => {
        const game = new Game();
        game.gameId = this.props.areaId;
        game.flags = this.props.flags;
        game.players = this.props.players;
        console.log('this is my new game ', game);
        this.props.createGame(game);
        this.props.modalView();
        this.props.navigate("GameView");
    }

    joinGame = () => {

    }

    _renderButton = (text) => (
        <TouchableOpacity onPress={this.createGame}>
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
          {this._renderButton('Create Game') }
        </View>
      );

    render() {
        const isModalVisible = this.props.isModalVisible;
        return (
            <View>
            <TouchableWithoutFeedback onPress={this.props.modalView}>
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
        flags: state.flags,
        players: state.players
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGame : game => {
            const action = createGameThunk(game);
            dispatch(action);
        }
    }
}

const ModalViewContainer = connect(mapStateToProps, mapDispatchToProps)(ModalView);
export default ModalViewContainer;
