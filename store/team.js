// Action Types
const CREATE_TEAM = 'CREATE_TEAM'
const CLEAR_TEAM = 'CLEAR_TEAM'

// Initial State

let teams = [ ]

// HAVE SESSION/GAME ID on every object, duration, gameID

/*
Object: 
{
    session: {
        gameId: null,
        duration: null,
    }
    teamId: null,
    teamName: null,
    color: null, // red/blue
}
*/

// Action Creators
export function createTeam(team){
  const action = {type: CREATE_TEAM, team}
  return action
}

export function takeFlag(team){
    const action = {type: CLEAR_TEAM, team}
    return action
}

// REDUCERS
export default (state = teams, action) => {
  switch (action.type) {

    case CREATE_TEAM:
        return [...state, action.team]

    case CLEAR_TEAM:
        return [ ]

    default:
        return state;
  }
}