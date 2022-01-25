import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  host: String,
  roomName: {
    type: String,
    required: false
  }
}, { timestamps: true })

const Room = new mongoose.model('Room', roomSchema);
export default Room;