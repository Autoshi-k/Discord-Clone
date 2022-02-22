import { createSlice, current } from "@reduxjs/toolkit";

export const roomContentSlice = createSlice({
  name: 'roomContent',
  initialState: {
    value: {
      usersInRoom: {},
      messages: []
    }
  },
  reducers: {
    messagesFetch: (state, action) => {
      let users = {};
      action.payload.usersInRoom.forEach(user => {
        users[user.id] = { 
          name: user.name, 
          avatar: user.avatar,
          tag: user.tag   
        }
      })
      state.value = {
        usersInRoom: users,
        messages: action.payload.messages
      }
    },
    newMessage: (state, action) => {
      let newArray = [...current(state.value.messages)];
      console.log(action.payload);
      newArray.push(action.payload);
      state.value.messages = newArray;
    },
    // removeFriendRequest: (state, action) => {
    //   let newArray = [...current(state.value)];
    //   const requestId = action.payload.requestId;
    //   const index = newArray.find(request => request.id === requestId[0] || request.id === requestId[1])
    //   newArray.splice(index, 1);
    //   state.value = newArray;
    // }
  }
})


export const { messagesFetch, newMessage } = roomContentSlice.actions;

export default roomContentSlice.reducer;