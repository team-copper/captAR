"use strict";

import firebase from "../firebase";
import { registerGameSubscriptions } from '../subscriptions';

// Action Types
const CREATE_GAME = 'CREATE_GAME' // create game session, assign gameSessionId (1st player, admin/leader)
const CLEAR_GAME = 'CLEAR_GAME' // after game ends, clear game session

// Initial State

let initialState = {
    gameKey: null,
    gameId: null
}

// Action Creators

export function createGame(gameKey, gameId){
    const payload = {gameKey, gameId}
    const action = {type: CREATE_GAME, payload}
    return action
}

export function clearGame(){
    const action = {type: CLEAR_GAME}
    return action
}

// THUNKS
export function createGameThunk(game){
    return function (dispatch) {
        const dbName = 'GameArea'+game.gameId.toString();
        const firebasedb = firebase.database().ref(`${dbName}`);
        const gameKey = firebasedb.push().key;
        game.gameFirebaseKey = gameKey;
        firebasedb.child(gameKey).set(game)
            .then(console.log('game added'))
            .catch(error => console.log('not added ', error))
        registerGameSubscriptions(`${dbName}/${gameKey}`)
        dispatch(createGame(gameKey, game.gameId))
    }
}

export function addPlayerThunk(player, areaId, gameKey){
    console.log('i am sending this to db, ', player, areaId, gameKey)
    return function (dispatch) {
        const dbName = 'GameArea'+areaId.toString();
        const firebasedb = firebase.database().ref(`/${dbName}/${gameKey}/players`);
        firebasedb.child(player.playerId).set(player)
            .then(console.log('player added'))
            .catch(error => console.log('not added ', error))
        dispatch(createGame(gameKey, areaId))
    }
}

export function clearGameThunk(gameSessionId){
    clearGame(gameSessionId)
}

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_GAME:
        return {gameKey: action.payload.gameKey, gameId: action.payload.gameId }

    case CLEAR_GAME:
        return {}

    default:
        return state;
  }
}
