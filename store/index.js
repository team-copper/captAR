import { combineReducers, createStore } from 'redux'

import authenticated from './authenticated'
import players from './player'
import flags from './flag'

const reducers = combineReducers({
  authenticated,
  flags,
  players,
})

const store = (reducers);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
