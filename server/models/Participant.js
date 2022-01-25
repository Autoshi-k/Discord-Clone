import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  roomId: String,
  participantId: String
}, { timestamps: true })

const Participant = new mongoose.model('Participant', participantSchema);
export default participantSchema;