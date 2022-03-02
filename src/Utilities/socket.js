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

    socket.on('add friend failed', ({ error, message }) => {
      dispatch(createError({ error, message }));
    })
    
    socket.on('removed friend request', ({ friendId }) => dispatch(declineFriend(friendId)))

    socket.on('friend added', ({ friendId, roomId }) => {
      console.log(friendId);
      dispatch(acceptFriend({ friendId, roomId }))
    })

    socket.on('chat added', ({ roomId, userFriend }) => { 
      console.log(roomId, userFriend);
      dispatch(newRoom({ roomId, userFriend }))
    })

    socket.on('message sent', ({ message }) => dispatch(newMessage(message)))
})}
