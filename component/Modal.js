import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import styles from "./Style";
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
        this.props.modalView();
        const game = new Game();
        game.gameId = this.props.gameId;
        game.players = [this.props.currentPlayerKey];
        game.onSession = true;
        this.props.createGame(game);
    }

    joinGame = () => {

    }

    _renderButton = (text) => (
        <TouchableOpacity onPress={this.createGame}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Item fixedlabel>
                {/* <Input style={styles.input} placeholder="Your next remainder" onChangeText={updatedText => this.props.updateRemainder(updatedText)} /> */}
                <Text>Have fun playing captAR!</Text>
            </Item>
          {this._renderButton('Create Game') }
        </View>
      );

    render() {
        const isModalVisible = this.props.isModalVisible;
        const buttonText = this.props.buttonText;
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
        currentPlayerKey: state.authenticated.localUserKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGame : game => {
            // console.log('i am creating ', game)
            const action = createGameThunk(game);
            dispatch(action);
        }
    }
}

const ModalViewContainer = connect(mapStateToProps, mapDispatchToProps)(ModalView);
export default ModalViewContainer;