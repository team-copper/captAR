import { combineReducers, createStore } from 'redux'

import authenticated from './authenticated'
import game from './game'

const reducers = combineReducers({
  authenticated,
  game
})

const store = createStore(reducers);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
export * from './game'
