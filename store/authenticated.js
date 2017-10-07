import firebase from '../firebase'

// Action Types
const IS_LOGGED_IN = 'IS_LOGGED_IN'
const IS_LOGGED_OUT = 'IS_LOGGED_OUT'

// Action Creators
export function isLoggedInAction(email) {
  const action = { type: IS_LOGGED_IN, email }
  return action
}

export function isLoggedOutAction() {
  const action = { type: IS_LOGGED_OUT }
  return action
}

// Thunks
export function isLoggedIn(email) {
  return function thunk(dispatch) {
    console.log('firebase : ', firebase)
    firebase.database().ref('users').push({
      email: email
    })
      .then(() => {
        console.log('called the database set')
        dispatch(isLoggedInAction(email))
      })
      .catch(error => console.log(error))
  }
}

// Thunks
export function isLoggedOut(email) {
  return function thunk(dispatch) {
    firebase.database().ref('users/' + email).update({
      loggedIn: false
    })
      .then(() => {
        dispatch(isLoggedOutAction(email))
      })
  }
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
