import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  host: String,
}, { timestamps: true })

const Room = new mongoose.model('Room', roomSchema);
export default roomSchema;