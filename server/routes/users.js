import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import Participant from '../models/Participant.js';
import Room from '../models/Room.js';
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
  const { displayName, tag } = req.body;
  
  const user = await User.findById(req.user.id).select('_id displayName image');
  const addUser = await User.findOne({ displayName: displayName }).select('_id displayName image');
  if (!addUser) return res.send({ err: 'user doesnt exist' });
  
  // creating new room
  const newRoom = new Room({ host: req.user.id });
  const participantHost = new Participant({ roomId: newRoom._id, userId: user._id });
  const participantAdd = new Participant({ roomId: newRoom._id, userId: addUser._id });
  try {
    // creating new participants
    await newRoom.save();
    await participantHost.save();
    await participantAdd.save();
    
  } catch (err) {
    console.log(err);
  }
  
  
  // update new converstion -- need to check if id alreay exist
  // or if its the same as user id (user adding himself)
  // ALSO need to add conversation in the other user !IMPORTANT
  
  // creating new room to add the store at the client side
  const room = {
    participants: {},
    messages: []
  }
  room.participants[participantHost._id.toString()] = user;
  room.participants[participantAdd._id.toString()] = addUser;

  res.status(200).send({ roomId: newRoom._id, room });
})