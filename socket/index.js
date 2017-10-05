import { isLoggedIn, isLoggedOut, createFlag, takeFlag, resetFlag, deleteFlag, createPlayer,
assignPlayerTeam, getPlayerLocation, changePlayerStatus, clearPlayer } from '../store'
import store from '../store'

window.navigator.userAgent = 'ReactNative';

// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
const io = require('socket.io-client');
const serverUrl = process.env.SERVER_URL || 'ws://172.16.23.36:1337'
const socket = io(serverUrl, {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

/*
  Receive application changes from other clients.
*/
socket.on('connect', () => {
  console.log('Connected to socket server at ', serverUrl);

  socket.on('create-flag', flag => {
    store.dispatch(createFlag(flag));
  });

  socket.on('take-flag', flag => {
    store.dispatch(takeFlag(flag));
  });

  socket.on('reset-flag', flag => {
    store.dispatch(resetFlag(flag));
  });

  socket.on('delete-flag', flag => {
    store.dispatch(deleteFlag(flag));
  });

  socket.on('create-player', player => {
    store.dispatch(createPlayer(player));
  });

  socket.on('assign-player-team', player => {
    store.dispatch(assignPlayerTeam(player));
  });

  socket.on('get-player-location', player => {
    store.dispatch(getPlayerLocation(player));
  });

  socket.on('change-player-status', player => {
    store.dispatch(changePlayerStatus(player));
  });

  socket.on('clear-player', player => {
    store.dispatch(clearPlayer(player));
  });

});

export default socket;
