"use strict";

import firebase from "../firebase";
import { registerGameSubscriptions } from '../subscriptions';

// Action Types
const FETCH_GAME = 'FETCH_GAME' // checks db to see if a game session exists for selected game field (non-1st player)
const CREATE_GAME = 'CREATE_GAME' // create game session, assign gameSessionId (1st player, admin/leader)
const FETCH_GAME_POLYGON = 'FETCH_GAME_POLYGON' // grab game polygon that pertains to player's selected park
const CLEAR_GAME = 'CLEAR_GAME' // after game ends, clear game session

// Initial State

let initialState = {
    gameId: null,
    gameArea: null,
    games: []
}

// Action Creators
export function fetchGame(game){
  const action = {type: FETCH_GAME, game}
  return action
}

export function createGame(gameKey, gameId){
    const payload = {gameKey, gameId}
    const action = {type: CREATE_GAME, payload}
    return action
}

export function fetchGamePolygon(game){
    const action = {type: FETCH_GAME_POLYGON, game}
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

export function addPlayerThunk(areaId, player){
    return function (dispatch) {
        const dbName = 'GameArea'+areaId.toString();
        const firebasedb = firebase.database().ref(`/${dbName}/-Kw8HdbD1ObPf2lOPn-D/players`);
        firebasedb.child(player.playerId).set(player)
            .then(console.log('player added')) 
            .catch(error => console.log('not added ', error))
    }
}

export function fetchGamePolygonThunk(game){
    fetchGamePolygon(game)
}

export function clearGameThunk(gameSessionId){
    clearGame(gameSessionId)
}

// REDUCERS
export default (state = initialState.games, action) => {
  switch (action.type) {

    case FETCH_GAME:
        return [action.game]

    case CREATE_GAME:
        return {gameKey: action.payload.gameKey, gameId: action.payload.gameId }

    case FETCH_GAME_POLYGON:
        return [action.game]

    case CLEAR_GAME:
        return [ ]
    default:
        return state;
  }
}
