"use strict";

import firebase from "../firebase";

// Action Types
const CREATE_PLAYER = 'CREATE_PLAYER'
const ASSIGN_PLAYER_TEAM = 'ASSIGN_PLAYER_TEAM'
// save player location --> thunk, save loc to db
const UPDATE_PLAYER_LOCATION = 'UPDATE_PLAYER_LOCATION'
const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS'
const CLEAR_PLAYER = 'CLEAR_PLAYER'

// Action Creators
export function createPlayer(player){
  const action = {type: CREATE_PLAYER, player}
  return action
}

export function assignPlayerTeam(player){
    const action = {type: ASSIGN_PLAYER_TEAM, player}
    return action
}

export function updatePlayerLocation(){
    const action = {type: UPDATE_PLAYER_LOCATION}
    return action
}

export function changePlayerStatus(player){
    const action = {type: CHANGE_PLAYER_STATUS, player}
    return action
}
//this updated to clear all players from store
export function clearPlayer(){
    const action = {type: CLEAR_PLAYER}
    return action
}

// THUNKS

export function createPlayerThunk(player){
    console.log("&&&&&&playerthunk")
    createPlayer(player)
}

export function assignPlayerTeamThunk(player){
    // where playerId is odd, red team, else blue team
    assignPlayerTeam(player)
}

export function updatePlayerLocationThunk({latitude, longitude}){
    console.log("*****THUNK ME*****")
    // firebase.database().ref('GameArea3/-Kw5kOK5-vXMLrT7R6rp/players/0/location').update({latitude, longitude})
    firebase.database()
        .ref('GameArea2/-Kw6geKIdPlOnE54l7Sj/players/1')
        .update({location: {latitude, longitude}})
    // .then(() => firebase.database().ref('GameArea3/-Kw5kOK5-vXMLrT7R6rp/players/0/location').update({longitude}))
    .then(() => console.log('location updated'))
    .catch(error => console.log(error))
    // firebase.database().ref('GameArea3/-Kw5kOK5-vXMLrT7R6rp/players/0/location').update({latitude, longitude})
 }

export function changePlayerStatusThunk(player){
    changePlayerStatus(player)
}

export function clearPlayerThunk(playerId){
    clearPlayer(playerId)
}

// REDUCERS
export default (state = [], action) => {
  switch (action.type) {

    case CREATE_PLAYER:
        return [...state, action.player]

    case ASSIGN_PLAYER_TEAM:
        let newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...state, action.player]

    case UPDATE_PLAYER_LOCATION:
        //  newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...state]

    case CHANGE_PLAYER_STATUS:
         newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...newState, action.player]

    case CLEAR_PLAYER:
        //  newState = state.filter(player => player.playerId !== action.playerId)
        return []

    default:
        return state;
  }
}
