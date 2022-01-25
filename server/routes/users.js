import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import PrivateRoom from '../models/Room.js';
import User from '../models/User.js';

export const router = express.Router();

// in this file you can find:
// find all users (not really needed tbh),
// add new conversation with user
// get all history chat with user

router.get('/', verify, async (req, res) => {
  // const user = await User.find({ id: req.user.id });
  // get all users in DB, only username & tag
  const allUsers = await User.find().select('id displayName tag');
  res.send(allUsers);
})

router.post('/addConv', verify, async (req, res) => {
  // user who made the request
  const user = await User.findOne({ id: req.user.id });
  const { displayName, tag } = req.body;
  
  console.log('me', user, 'other', displayName);
  // user to add to { rooms: private }
  const addUser = await User.findOne({ displayName: displayName });
  if (!addUser) return res.send({ err: 'user doesnt exist' });
  
  let newRoom;
  try {
    newRoom = new PrivateRoom({
      participants: [{
        id: user.id,
        displayName: user.displayName,
        image: user.image,
        tag: user.tag
      }, {
        id: addUser.id,
        displayName: addUser.displayName,
        image: addUser.image,
        tag: addUser.tag
      }]
    });
    console.log(newRoom);
    await newRoom.save();
    user.rooms.private.push(newRoom);
    addUser.rooms.private.push(newRoom);
    await user.save();
    await addUser.save();
    
  } catch (err) {
    console.log(err);
  }
  
  
  // update new converstion -- need to check if id alreay exist
  // or if its the same as user id (user adding himself)
  // ALSO need to add conversation in the other user !IMPORTANT
  // user.conversations.push({ id: addUser.id, displayName: addUser.displayName, tag: addUser.tag });
  // await user.save();
  res.status(200).send({ newRoom });
})

router.get('/getHistory', verify, async (req, res) => {
  res.send({ msg: 'okay' })
})
router.get('/getHistory/:roomId', verify, async (req, res) => {
  const { roomId } = req.params;
  console.log('roomId', roomId);  
  const roomMessages = await PrivateRoom.findById(roomId);
  console.log('roomMessages', roomMessages);
  console.log(roomMessages.messages.slice(-3));
  res.send(roomMessages.messages.slice(-40));
})