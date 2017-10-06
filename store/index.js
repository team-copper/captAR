import { combineReducers, createStore } from 'redux'

import authenticated from './authenticated'
import player from './player'
import flag from './flag'

const reducers = combineReducers({
  authenticated,
  player,
  flag
})

const store = createStore(reducers);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
