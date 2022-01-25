import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Participant from '../models/Participant.js';

export const router = express.Router();

// the whole app in under url /channels therefor this /api/channels
// is the first stop after logging in
// getting user information is the only purpose 


const getMessages = async (participant) => {
  const thisParticipant = await findById(participant.userId).select('_id displayName image');
  const messagesByParticipant = await Message.find({participantId: participant._id}).sort({ _id: -1 }).limit(30);
  // messagesByParticipant: [{participantId, content, timestamps}, {participantId, content, timestamps}]
  // thisParticipant: [{_id, displayName, image}]
  return {
    participant: thisParticipant,
    messages: messagesByParticipant
  }
}

const getParticipants = async (room) => {
  const participantsInRoom = await Participant.find({ roomId: room.roomId });
  return Promise.all(participantsInRoom.map(participant => {return { room: room.roomId, messages: getMessages(participant) }})) // return array
}

const getRoomsData = async (rooms) => {
  return Promise.all(rooms.map(room => getParticipants(room))) // return array
}

router.get('/', verify, async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user.id).select('-password -updatedAt -createdAt -__v');
  const rooms = await Participant.find({ userId: user._id });
  const roomsContainer = await getRoomsData(rooms);

  res.send({ user, roomsContainer});
})
