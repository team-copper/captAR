// Action Types
const CREATE_FLAG = 'CREATE_FLAG'
const UPDATE_FLAG_LOCATION = 'UPDATE_FLAG_LOCATION'

// Action Creators
export function isLoggedIn(){
  const action = {type: IS_LOGGED_IN}
  return action
}

export function isLoggedOut(){
  const action = {type: IS_LOGGED_OUT}
  return action
}

// REDUCERS
export default (state = false, action) => {
  switch (action.type) {

    case IS_LOGGED_IN:
      return true

    case IS_LOGGED_OUT:
      return false

    default:
      return state;
  }
}

// Flag
// Team
// Initial Location
// Holder
