import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const router = express.Router();
// validations
import { registerValidation, loginValidation } from '../helper/validation.js';

router.post('/register', async (req, res) => {
  // validate before adding a user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // check if email already exist
  const emailExist = await User.findOne({ 'email': req.body.email});
  if (emailExist) return res.status(400).send('Email already exist');
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  
  // create new user & password
  const user = new User({
    id: uuidv4(),
    displayName: req.body.displayName,
    email: req.body.email,
    tag: Math.floor(Math.random() * (9999 - 1000) + 1000),
    password: hashPassword 
  });
  
  console.log(user);
  // add user & password to DB
  try {
    await user.save();
    res.send(user.id + ' Created');
  } catch (err) {
      // i want User schema won't have _id, but when trying to save new user
      // error => docuement must have an _id before saving
      console.log(err);
      res.status(400).send(err);
  }
});


router.post('/login', async (req, res) => {
  // validate before adding a user
  console.log('0');
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  console.log('1');
  
  // check if email exist
  const user = await User.findOne({ 'email': req.body.email});
  if (!user) return res.status(400).send('Email or password is wrong');
  console.log('2');
  
  // validate password --ERROR
  // const validPass = await bcrypt.compare(req.body.password, user.password);
  // if (!validPass) return res.status(400).send('email or password is wrong');
  
  // Create and assign a token
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).json(token);
  console.log('3');
  
  res.json({ isAuth: true, token, user});
})