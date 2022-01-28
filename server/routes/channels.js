import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Participant from '../models/Participant.js';

export const router = express.Router();

// the whole app in under url /channels therefor this /api/channels
// is the first stop after logging in
// getting user information is the only purpose 

const getParticipantInformation = async (objRooms, roomId, participant) => {
  // update information in that sub-object
  const thisParticipant = await User.findById(participant.userId)
                                    .select('_id displayName image');
  // const messagesByParticipant = await Message.find({participantId: participant._id})
  //                                            .sort({ _id: -1 })
  //                                            .limit(30);
  
  objRooms[roomId].participants[participant._id.toString()] = { 
    _id: thisParticipant._id, 
    displayName: thisParticipant.displayName, 
    imgae: thisParticipant.image 
  };
  // objRooms[roomId].messages.push(...messagesByParticipant);
}

const getParticipants = async (objRooms, room) => {
  const participantsInRoom = await Participant.find({ roomId: room.roomId })
                                              .select('userId');
  const participantsId = participantsInRoom.map(participant => participant._id.toString())
  const messagesByParticipants = await Message.find({participantId: { $in: participantsId } })
                                              .sort('createdAt')
                                              .limit(30);
  // set sub-object
  objRooms[room.roomId] = {
    participants: {},
    messages: messagesByParticipants
  };

  await Promise.all(participantsInRoom.map(participant => getParticipantInformation(objRooms, room.roomId, participant)), err => console.log(err)) // return array
  
  // const messagesByParticipants = await Message.find({participantId: [...participantsInRoom._id]}).sort({ _id: -1 }).limit(30);
  // console.log(messagesByParticipants);
}

const getRoomsData = async (objRooms, rooms) => {
  await Promise.all(rooms.map(room => getParticipants(objRooms, room)), err => console.log(err)) // return array
}

router.get('/', verify, async (req, res) => {
  const user = await User.findById(req.user.id)
                         .select('-password -updatedAt -createdAt -__v');
  const rooms = await Participant.find({ userId: user._id }); // array
  // create an object with sub-objects of roomId's
  // any roomId has sub-sub-object with participants and an array for all messages
  let objRooms = {};
  await getRoomsData(objRooms, rooms);
  res.send({ user, objRooms });
})
