import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import User from '../models/User.js';

export const router = express.Router();

router.get('/', verify, async (req, res) => {
  const user = await User.find({ id: req.user.id }, { password: 0 });
  // sends back all the information about the user (password not included)
  res.send(user);
})
