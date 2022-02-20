import { io } from 'socket.io-client';
import { addNewMessage, newRoom, updateStatus } from '../features/rooms';
import { newFriendRequests, removeFriendRequest } from '../features/pending';
import { addFriend } from '../features/friends';

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

    socket.on('pending request', ({ request }) => {
      console.log('hi');
      dispatch(newFriendRequests(request));
    })

    socket.on('removed friend request', ({ requestId }) => {
      dispatch(removeFriendRequest({ requestId }));
    })
    
    socket.on('friend added', ({ friendAdded }) => {
      dispatch(addFriend(friendAdded));
    })

    socket.on('chat added', ({ roomId, friend }) => {
      // console.log(roomId, friend);  
      console.log('???????');  
      // console.log('???????');  
      dispatch(newRoom({ roomId, friend }));
    })
})}
