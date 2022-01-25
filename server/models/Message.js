import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: String,
  participantId: String
}, { timestamps: true });

const Message = new mongoose.model('Message', messageSchema);
export default Message;

// will need to add room