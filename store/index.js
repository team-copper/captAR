import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import authenticated from './authenticated'
import game from './game'

const reducers = combineReducers({
  authenticated,
  game
})
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middleware);

export default store;
export * from './authenticated'
export * from './flag'
export * from './player'
export * from './team'
export * from './game'
