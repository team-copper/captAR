import { combineReducers, createStore } from 'redux'

import authenticated from './authenticated'

const reducers = combineReducers({
  authenticated
})

const store = createStore(reducers);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
