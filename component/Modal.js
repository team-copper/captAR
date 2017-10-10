import React, { Component } from "react";
import { ScrollView, FlatList, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Style } from './index';
import { Game, Player } from '../model';
import { createGameThunk, clearPlayer, deleteFlag, addPlayerThunk } from '../store';

class ModalView extends Component {

    constructor(props) {
        super(props)
        this._renderCreateButton = this._renderCreateButton.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
        this._renderJoinButton = this._renderJoinButton.bind(this);
        this.createGame = this.createGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    createGame = () => {
        const game = new Game();
        game.gameId = this.props.areaId;
        game.flags = this.props.flags;
        game.players = this.props.players;
        console.log('this is my new game ', game);
        this.props.createGame(game);
        this.props.modalView();
        this.props.clearStore();
        this.props.navigate("GameView");
    }

    joinGame = () => {
        const player = new Player();
        player.playerKey = this.props.currentPlayerKey;
        player.location = {
            latitude: this.props.latitude,
            longitude: this.props.longitude
        };
        player.playerId = this.props.players.length+1;
        player.team = player.playerId%2 ? "red" : "blue";
        this.props.clearStore();
        this.props.joinGame(player);
        this.props.navigate("GameView");
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

    // _renderModalContent = () => (
    //     <View style={Style.modalContent}>
    //         <Item fixedlabel>
    //             <Text>Have fun playing captAR!</Text>
    //         </Item>
    //       {this._renderCreateButton('Create Game') }
          
    //       {this.props.games.length ? 
    //         <View>
    //             <Text>Or join the game below!</Text>
    //             <List>
    //                 Object.keys(this.props.games).map(key => (
    //                     <FlatList
    //                         data={this.props.games}
    //                         renderItem={({ item }) => (
    //                             <ListItem
    //                                 title={Object.keys(this.props.games[item])}
    //                             />
    //                         )}
    //                     />
    //                 ))
    //             </List>
    //             {this._renderJoinButton('Join Game') }
    //         </View>
    //         : <View></View>
    //       }
    //     </View>
    //   );

    // _renderModalContent = () => (
    //     <View style={Style.modalContent}>       
    //       {this.props.games.length ? 
    //         <View>
    //             {/* <Text>Or join the game below!</Text> */}
    //             <List>
    //                 <FlatList
    //                     data={Object.keys(this.props.games)}
    //                     renderItem={({ item }) => (
    //                         console.log('game props ', this.props.games, ' and item ', Object.keys(this.props.games[item]))
                            
    //                     )}
    //                 />
    //             </List>
    //             {this._renderJoinButton('Join Game') }
    //         </View>
    //         : <View></View>
    //       }
    //     </View>
    //   );

    // _renderModalContent = () => (
    //     <View style={Style.modalContent}>
    //         <Item fixedlabel>
    //             <Text>Have fun playing captAR!</Text>
    //         </Item>
    //       {this._renderCreateButton('Create Game') }
          
    //       {this.props.games.length ? 
    //       <Text>Hello</Text>
    //         {/* <ScrollView>
    //             this.props.games.map(game => (
    //                 <View key={Object.keys(1)}>
    //                     <Text>{game}</Text>
    //                 </View>
    //             ))
    //         </ScrollView> */}
    //         : <View></View>
    //       }
    //     </View>
    //   );

    _renderModalContent = () => (
        <View style={Style.modalContent}>
            <Item fixedlabel>
                <Text>Have fun playing captAR!</Text>
            </Item>
          {this._renderCreateButton('Create Game') }
          
            {this._renderJoinButton('Join Game') }
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
        currentPlayerKey: state.authenticated.localUserKey,
        flags: state.flags,
        players: state.players,
        games: state.game
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGame : game => {
            const action = createGameThunk(game);
            dispatch(action);
        },
        joinGame: player => {
          dispatch(addPlayerThunk(player))
        },
        clearStore: () => {
            dispatch(clearPlayer());
            dispatch(deleteFlag());
        }
    }
}

const ModalViewContainer = connect(mapStateToProps, mapDispatchToProps)(ModalView);
export default ModalViewContainer;
