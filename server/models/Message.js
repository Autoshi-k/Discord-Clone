import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: String,
  sender: {
    id: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    image: {  
      type: String,
      required: true,
    }
  }
}, { timestamps: true });

const Message = new mongoose.model('Message', messageSchema);
export default Message;

// will need to add room