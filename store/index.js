import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import authenticated from './authenticated'
import players from './player'

const reducers = combineReducers({
  authenticated,
  players
})
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middleware);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
export * from './game'
