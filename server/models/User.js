import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
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
    default: 1
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
    type: String,
    required: true
  },
  status: Boolean,
  linked: {
    friends: Array,
    servers: Array
  },
  conversations: Array,
  _id: false
  // prevent _id
  // subdocArray: [{
    // field: { type: String }
//  }]
}, { timestamps: true })

const User = new mongoose.model('User', userSchema);
export default User;