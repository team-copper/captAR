"use strict";

import { elevatedAcre, bowlingGreen, batteryPark } from "../assets/presetGameFields"
import geolib from "geolib"

// Action Types
const CREATE_FLAG = 'CREATE_FLAG'
const GET_DIST_FROM_FLAG = 'GET_DIST_FROM_FLAG'
const TAKE_FLAG = 'TAKE_FLAG' // updates taken and holder attribute OR holder can be used as status
const RESET_FLAG_LOCATION = 'RESET_FLAG_LOCATION'
const DELETE_FLAG = 'DELETE_FLAG'

// Initial State
// Note: flags currently hardcoded; please update to create flags based on player's selected game view / gameId info
// Question: will the player's selected game view choice (e.g., elevatedAcre) be held in session.gameId?


// from seed.js fed into Firebase
// let flags = [
//     {
//         flagId: 1,
//         team: 'red',
//         startLocation: { latitude: 40.703295, longitude: -74.00845 },
//         // location: elevatedAcre.redFlagSpawn[Math.floor(Math.random() * 5)], // randomly generated start point; change to holder's location when 'isTaken' is true
//         // Note: must switch location to bowlingGreen, batteryPark, or elevatedAcre based on player selection; please update proposed logic in createFlagThunk() (line 81)
//         isTaken: false,
//         holder: null,
//         currentLocation: null,
//     },
//     {
//         flagId: 2,
//         team: 'blue',
//         startLocation: { latitude: 40.703414, longitude: -74.008663 },
//         // location: elevatedAcre.blueFlagSpawn[Math.floor(Math.random() * 5)],
//         isTaken: false,
//         holder: null,
//         currentLocation: null,
//     },
// ]

// HAVE SESSION/GAME ID on every object, duration, gameID

/*
Object:
{
    session: {
        gameId: null,
        duration: null,
    }
    flagId: null,
    startLoc: {latitude: 0, longitude: 0}, // idea: randomly generate location within bounds
    currentLoc: {latitude: 0, longitude: 0}, // current location is either start location or holder location
    team: null, /// red/blue
    // status: null, // taken? true/false
    holder: null, // playerId of player who captures flag
}
*/

// as soon as flag is created, send emit to socket server, call createFlag() AC then do socket emit


// Action Creators
export function createFlag(flag){
  const action = {type: CREATE_FLAG, flag}
  return action
}

export function getDistanceFromFlag(flag){
    const action = {type: GET_DIST_FROM_FLAG, flag}
    return action
}

export function takeFlag(flag){
    const action = {type: TAKE_FLAG, flag}
    return action
}

export function resetFlagLocation(flag){
    const action = {type: RESET_FLAG_LOCATION, flag}
    return action
}
//updated to delete all flag
export function deleteFlag(){
    const action = {type: DELETE_FLAG}
    return action
}

// THUNKS

// export function createFlagThunk(flag){
//     console.log("*****", flag)
//     // if selected game view / polygonId === 1, randomly generate flags for elevatedAcre
//             // elevatedAcre.redFlagSpawn[Math.floor(Math.random() * 5)]
//             // elevatedAcre.blueFlagSpawn[Math.floor(Math.random() * 5)]
//     // if selected game view / polygonId === 2, randomly generate flags for bowlingGreen
//             // bowlingGreen.redFlagSpawn[Math.floor(Math.random() * 3)]
//             // bowlingGreen.blueFlagSpawn[Math.floor(Math.random() * 3)]
//     // if selected game view / polygonId === 3, randomly generate flags for batteryPark
//             // batteryPark.redFlagSpawn[Math.floor(Math.random() * 5)]
//             // batteryPark.blueFlagSpawn[Math.floor(Math.random() * 5)]
//     createFlag(flag)
// }

// attempted to create CALCULATE_DISTANCE on Flag store and test this part
export function getDistanceFromFlagThunk(lat, lng, event){
    return (dispatch) => {
        const dist = geolib.getDistance(
          { latitude: lat, longitude: lng },
          {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
          },
          1,
          3
        )
        .toFixed(2);
        dispatch(getDistanceFromFlag(dist))
    }
}

export function takeFlagThunk(flag){

}

export function resetFlagThunk(flag){
    resetFlag(flag)
}

export function deleteFlagThunk(flag){
    deleteFlag(flag)
}

// REDUCERS
export default (state = [], action) => {
  switch (action.type) {

    case CREATE_FLAG:
        return [...state, action.flag]

    case GET_DIST_FROM_FLAG:


    case TAKE_FLAG:
        let newState = state.filter(flag => flag.flagId !== action.flag.flagId)
        return [...newState, action.flag]

    case RESET_FLAG_LOCATION:
         newState = state.filter(flag => flag.flagId !== action.flag.flagId)
        return [...newState, action.flag]

    case DELETE_FLAG:
        //  newState = state.filter(flag => flag.flagId !== action.flagId)
        return []

    default:
        return state;
  }
}
