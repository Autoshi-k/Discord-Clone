import { io } from 'socket.io-client';
import { addNewMessage, newRoom, updateStatus } from '../features/rooms';
import { acceptFriend, createError, createRequest, declineFriend } from '../features/friends';
import { newMessage } from '../features/roomContent';

export const socket = io('127.0.0.1:3001/', { transports: ['websocket'], auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });
export let socketID = '';
// socket.on('connect', () => {
//   socketID = socket.id;
// })

export const initSocket = (dispatch) => {
  socket.on('connect', () => {
    socketID = socket.id;

    socket.on('success send new message', ({ roomId, newMessage }) => {
      const newMessageObj = { roomId, message: newMessage };
      dispatch(addNewMessage(newMessageObj))
    })
    
    socket.on('user changed status', ({ userId, newStatus }) => {
      dispatch(updateStatus({ userId, newStatus }))
    })

    socket.on('pending request', (request) => dispatch(createRequest(request)))

    socket.on('add friend not found', ({ error }) => {
      dispatch(createError({ 
        error, 
        message: 'Hm, didn\'nt work. Double check the capitalization, spelling, any spaces, and numbers are corret.' 
      }));
    })

    socket.on('removed friend request', ({ friendId }) => dispatch(declineFriend(friendId)))

    socket.on('friend added', ({ friendId }) => {
      console.log(friendId);
      dispatch(acceptFriend(friendId))
    })

    socket.on('chat added', ({ roomId, friend }) => dispatch(newRoom({ roomId, friend })))

    socket.on('message sent', ({ message }) => dispatch(newMessage(message)))
})}
