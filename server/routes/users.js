import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import User from '../models/User.js';

export const router = express.Router();

router.get('/', verify, async (req, res) => {
  // const user = await User.find({ id: req.user.id });
  // get all users in DB, only username & tag
  const allUsers = await User.find().select('id displayName tag');
  res.send(allUsers);
})

router.post('/addConv', verify, async (req, res) => {
  // user who made the request
  const user = await User.findOne({ id: req.user.id });
  const { displayName, tag } = req.body;
  
  console.log('me', user, 'other', displayName);
  // user to add to { conversations }
  const addUser = await User.findOne(
    { displayName: displayName },
    // addUser doesnt include data below (i can change it like in line 10)
    { _id: 0, conversations: 0, email: 0, date: 0, Linked: 0, password: 0 }
  );

  if (!addUser) return res.send({ err: 'user doesnt exist' });

  // update new converstion -- need to check if id alreay exist
  // or if its the same as user id (user adding himself)
  // ALSO need to add conversation in the other user !IMPORTANT
  user.conversations.push({ id: addUser.id, displayName: addUser.displayName, tag: addUser.tag });
  await user.save();
  res.status(200).send({ id: addUser.id, displayName: addUser.displayName, tag: addUser.tag });
})