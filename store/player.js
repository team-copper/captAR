
// Action Types
const CREATE_PLAYER = 'CREATE_PLAYER'
const ASSIGN_PLAYER_TEAM = 'ASSIGN_PLAYER_TEAM'
// save player location --> thunk, save loc to db
const GET_PLAYERS_LOCATION = 'GET_PLAYERS_LOCATION'
const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS'
const CLEAR_PLAYER = 'CLEAR_PLAYER'

// Initial State (currently hardcoded)
let players = [
    {
        session: {
            gameId: 1,
            duration: null, //do we need this? - jordan
            // Re: we can work without it; only needed if we want the rounds to be 5 min max - jannine
        },
        playerId: 1,
        location: { latitude: 40.703394, longitude: -74.008622 },
        team: 'red',
        // Question: after being tagged, instead of forcing a player to their own side, can we pause their game for 10 secs at their current loc?
        hasFlag: false
    },
    {
        session: {
            gameId: 1,
            duration: null, //do we need this?
        },
        playerId: 2,
        location: { latitude: 40.703441, longitude: -74.008713 },
        team: 'blue',
        hasFlag: false
    },
    {
        session: {
            gameId: 1,
            duration: null, //do we need this?
        },
        playerId: 3,
        location: { latitude: 40.703325, longitude: -74.008456 },
        team: 'red',
        hasFlag: false
    },
    {
        session: {
            gameId: 1,
            duration: null, //do we need this?
        },
        playerId: 4,
        location: { latitude: 40.703258, longitude:  -74.008663 },
        team: 'blue',
        hasFlag: true
    }
]

// HAVE SESSION/GAME ID on every object, duration, gameID

/*
Object:
{
    session: {
        gameId: null,
        duration: null,
    }
    playerId: null,
    location: {
        position: { latitude: null, longitude: null }
    },
    team: null, // red/blue
    tagged: null, // true/false
    hasFlag: null, // true/false
}
*/

// Action Creators
export function createPlayer(player){
  const action = {type: CREATE_PLAYER, player}
  return action
}

export function assignPlayerTeam(player){
    const action = {type: ASSIGN_PLAYER_TEAM, player}
    return action
}

export function getPlayersLocation(){
    const action = {type: GET_PLAYERS_LOCATION}
    return action
}

export function changePlayerStatus(player){
    const action = {type: CHANGE_PLAYER_STATUS, player}
    return action
}

export function clearPlayer(playerId){
    const action = {type: CLEAR_PLAYER, playerId}
    return action
}

// THUNKS

export function createPlayerThunk(player){
    // assign playerId, 1,2,3,4 etc., by order of log-in
    console.log("&&&&&&playerthunk")
    createPlayer(player)
}

export function assignPlayerTeamThunk(player){
    // where playerId is odd, red team, else blue team 
    assignPlayerTeam(player)
}

export function getPlayerLocationThunk(player){
    getPlayerLocation(player)
}

export function changePlayerStatusThunk(player){
    changePlayerStatus(player)
}

export function clearPlayerThunk(playerId){
    clearPlayer(playerId)
}

// REDUCERS
export default (state = players, action) => {
  switch (action.type) {

    case CREATE_PLAYER:
        return [...state, action.player]

    case ASSIGN_PLAYER_TEAM:
        let newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...state, action.player]

    case GET_PLAYERS_LOCATION:
        //  newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...state]

    case CHANGE_PLAYER_STATUS:
         newState = state.filter(player => player.playerId !== action.player.playerId)
        return [...state, action.player]

    case CLEAR_PLAYER:
         newState = state.filter(player => player.playerId !== action.playerId)
        return newState

    default:
        return state;
  }
}
