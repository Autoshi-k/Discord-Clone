import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  roomId: String,
  userId: String
}, { timestamps: true })

const Participant = new mongoose.model('Participant', participantSchema);
export default Participant;