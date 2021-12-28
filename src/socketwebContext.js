import React, { createContext, useEffect, useState } from 'react'
import {io, Socket} from 'socket.io-client';
import { useDispatch } from 'react-redux';
// import { updateChatLog } from './actions';

export const WebSocketContext = createContext(null)

// export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
  let [socket, setSocket] = useState(io());
 
 useEffect(() => {
    socket.on('connect', (socket1) => {
    console.log('a user connected');
    });
  }, []);



  // const dispatch = useDispatch();

  //const sendMessage = (roomId, message) => {
      // const payload = {
      //     roomId: roomId,
      //     data: message
      // }
    //   socket.emit("event://send-message", JSON.stringify(payload));
    //   dispatch(updateChatLog(payload));
    //}



    return (
        <WebSocketContext.Provider value={ {socket} }>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider;