import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    minLength : 2,
    maxLength : 255
  },
  image: {
    type: String,
    required: false,
    default: 'https://support.discord.com/hc/user_images/l12c7vKVRCd-XLIdDkLUDg.png'
  },
  status: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }, 
  email: {
    type: String,
    required: true,
    minLength : 2,
    maxLength : 255
  },
  password: {
    type: String,
    minLength : 2,
    maxLength : 255
  }, 
  tag: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const User = new mongoose.model('User', userSchema);
export default User;