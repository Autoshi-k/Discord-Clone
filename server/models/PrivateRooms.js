import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

// import Message from "./Message";

const privateRoomSchema = new mongoose.Schema({
  participants: Array,
  messages: Array
}, { timestamps: true })

const PrivateRoom = new mongoose.model('PrivateRoom', privateRoomSchema);
export default PrivateRoom;