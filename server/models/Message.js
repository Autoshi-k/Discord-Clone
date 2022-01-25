import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: String,
  participantId: String,
  content: String
}, { timestamps: true });

const Message = new mongoose.model('Message', messageSchema);
export default Message;

// will need to add room