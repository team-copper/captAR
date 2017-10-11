//not sure how to get item detail on press

import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addPlayerThunk } from '../store';
import { registerGameSubscriptions } from '../subscriptions';

class ListView extends Component {

    constructor() {
        super()
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent = (key, numberPlayers, areaId) => {
        const dbName = 'GameArea'+areaId;
        const player = this.props.navigation.state.params.player;
        player.playerId = numberPlayers;
        player.team = player.playerId%2 ? "blue" : "red";
        console.log('sending player to db ', player);
        registerGameSubscriptions(`${dbName}/${key}`);
        this.props.joinGame(player, areaId, key);
        this.props.navigation.state.params.navigate("GameView");
    }

    render() {
       const players = this.props.navigation.state.params.players
       console.log('i am getting players ', players)
       return (
          <View>
            <View style={styles.header}>
                <View style={styles.bar}>
                    <Text style={styles.title}>Select a Game to Join</Text>
                </View>
            </View>
             <ScrollView style={styles.marginTop}>
                 <View style={styles.scrollView}>
                {
                   players.length && players.map((item, index) => (
                      <TouchableOpacity key = {item.key} style = {styles.item} onPress={() => this.handleEvent(item.key, item.numberPlayers, item.areaId)}>
                         <Text>Game {index+1}</Text>
                         <Text>Number of players: {item.numberPlayers}</Text>
                      </TouchableOpacity>
                   ))
                }
                </View>
             </ScrollView>
          </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        joinGame: (player, areaId, gameKey) => {
            dispatch(addPlayerThunk(player, areaId, gameKey))
        }
    }
}

const ListViewContainer = connect(null, mapDispatchToProps)(ListView)
export default ListViewContainer
 
const styles = StyleSheet.create ({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#39CCCC',
        overflow: 'hidden',
      },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
      },
    scrollView: {
        marginTop: 50,
    },
    item: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    }
 })