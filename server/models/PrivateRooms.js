import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

// import Message from "./Message";

const privateRoomSchema = new mongoose.Schema({
  participants: [],
  messages: [{
    type: ObjectId,
    ref: 'Message'
  }]
}, { timestamps: true })

const PrivateRoom = new mongoose.model('User', privateRoomSchema);
export default PrivateRoom;