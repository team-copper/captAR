import { isLoggedIn, isLoggedOut } from '../store'
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

  socket.on('new-campus', campus => {
    store.dispatch(isLoggedIn);
  });

  socket.on('update-campus', campus => {
    store.dispatch(updateCampus(campus));
  });

  socket.on('delete-campus', campusId => {
    store.dispatch(deleteCampus(campusId));
  });

  socket.on('new-student', student => {
    store.dispatch(getStudent(student));
  });

  socket.on('update-student', student => {
    store.dispatch(updateStudent(student));
  });

  socket.on('delete-student', studentId => {
    store.dispatch(deleteStudent(studentId));
  });

});

export default socket;
