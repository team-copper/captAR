import { combineReducers, createStore } from 'redux'

import authenticated from './authenticated'
import players from './player'

const reducers = combineReducers({
  authenticated,
  players
})

const store = createStore(reducers);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
