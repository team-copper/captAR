import socket from 'socket.io-client'

// Action Types
const CREATE_FLAG = 'CREATE_FLAG'
const TAKE_FLAG = 'TAKE_FLAG' // updates taken and holder attribute OR holder can be used as status
const RESET_FLAG_LOCATION = 'RESET_FLAG_LOCATION'
const DELETE_FLAG = 'DELETE_FLAG'

// Initial State

let flags = [ ]

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

export function takeFlag(flag){
    const action = {type: TAKE_FLAG, flag}
    return action
}

export function resetFlagLocation(flag){
    const action = {type: RESET_FLAG_LOCATION, flag}
    return action
}

export function deleteFlag(flagId){
    const action = {type: DELETE_FLAG, flagId}
    return action
}

// THUNKS

export function createFlagThunk(flag){
    createFlag(flag)
    socket.emit(createFlag(flag))
}

export function takeFlagThunk(flag){
    takeFlag(flag)
    socket.emit(takeFlag(flag))
}

export function resetFlagThunk(flag){
    resetFlagThunk(flag)
    socket.emit(resetFlagLocation(flag))
}

export function deleteFlagThunk(flag){
    deleteFlagThunk(flag)
    socket.emit(deleteFlagLocation(flag))
}

// REDUCERS
export default (state = flags, action) => {
  switch (action.type) {

    case CREATE_FLAG:
        return [...state, action.flag]

    case TAKE_FLAG:
        let newState = state.filter(flag => flag.flagId !== action.flag.flagId)
        return [...newState, action.flag]

    case RESET_FLAG_LOCATION:
        let newState = state.filter(flag => flag.flagId !== action.flag.flagId)
        return [...newState, action.flag]

    case DELETE_FLAG:
        let newState = state.filter(flag => flag.flagId !== action.flagId)
        return newState

    default:
        return state;
  }
}
