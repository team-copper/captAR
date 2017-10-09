import firebase from "../firebase";

// Action Types
const FETCH_GAME = 'FETCH_GAME' // checks db to see if a game session exists for selected game field (non-1st player)
const CREATE_GAME = 'CREATE_GAME' // create game session, assign gameSessionId (1st player, admin/leader)
const FETCH_GAME_POLYGON = 'FETCH_GAME_POLYGON' // grab game polygon that pertains to player's selected park
const CLEAR_GAME = 'CLEAR_GAME' // after game ends, clear game session

// Initial State

let games = [ ]

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
export function fetchGame(game){
  const action = {type: FETCH_GAME, game}
  return action
}

export function createGame(gameSessionId){
    const action = {type: CREATE_GAME, gameSessionId}
    return action
}

export function fetchGamePolygon(game){
    const action = {type: FETCH_GAME_POLYGON, game}
    return action
}

export function clearGame(game){
    const action = {type: CLEAR_GAME, game}
    return action
}

// THUNKS

export function fetchGameThunk(polyId) {
    return function (dispatch) {
        const dbName = 'GameArea'+polyId.toString();
        firebase.database().ref(`${dbName}`).once('value')
            .then(function(snapshot) {
                var game = snapshot.val();
                console.log('data from server ', game)
                dispatch(fetchGame(game))
            })
            .catch(error => console.log('no message found ', error))
    }
}

export function createGameThunk(game){
    return function (dispatch) {
        const dbName = 'GameArea'+game.gameId.toString();
        firebase.database().ref(`${dbName}`).push().set(game)
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
export default (state = games, action) => {
  switch (action.type) {

    case FETCH_GAME:
        return [action.game]

    case CREATE_GAME:
        return [action.gameSessionId]

    case FETCH_GAME_POLYGON:
        return [action.game]

    case CLEAR_GAME:
        return [ ]

    default:
        return state;
  }
}