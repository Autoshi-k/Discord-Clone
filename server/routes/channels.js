import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import PrivateRoom from '../models/PrivateRooms.js';
import User from '../models/User.js';

export const router = express.Router();

// the whole app in under url /channels therefor this /api/channels
// is the first stop after logging in
// getting user information is the only purpose 
router.get('/', verify, async (req, res) => {
  const user = await User.findOne({ id: req.user.id }, { password: 0 });
  console.log(user.id);
  const allChats = await PrivateRoom.find({ 'participants.id': user.id });
  const chatsHistory = allChats.map(chat => {
    // console.log(chat)
    return { 
      roomId: chat._id.toString(), 
      messages: chat.messages.slice(-40)
    }
  });
  // sends back all the information about the user (password not included)
  // console.log(chatsHistory);
  console.log({ user, chatsHistory});
  res.send({ user, chatsHistory});
  // res.send({ user, ch});
})
