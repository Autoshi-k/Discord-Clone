import mongoose from 'mongoose';

const connectedSchema = new mongoose.Schema({
  socketId: String,
  userId: String
})

const Connected = new mongoose.model('Connected', connectedSchema);
export default Connected;