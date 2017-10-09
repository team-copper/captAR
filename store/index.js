import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import authenticated from './authenticated'
import players from './player'
import flags from './flag'

const reducers = combineReducers({
  authenticated,
  players,
  flags
})
const middleware = applyMiddleware(thunkMiddleware);

// const store = createStore(reducers, applyMiddleware(thunkMiddleware, createLogger()));
//Anuj notes: disabling createLogger middleware temporarily
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
export * from './game'
