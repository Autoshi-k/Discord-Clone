import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../connection.js';
// validations
import { registerValidation, loginValidation } from '../utilities/validation.js';
import { comparePasswords, hashPassword } from '../utilities/hash.js';

export const router = express.Router();

const defaultAvatars = [
  '53l6rkzsl058dp7k',
  '53l6rkzsl058dk08',
  '53l6rkzsl058dfjp',
  '53l6rkzsl058c96c',
  '53l6rkzsl058c805',
  '53l6rkzsl058c2w3',
  '53l6rkzsl058bxh9'
]

router.post('/register', async (req, res) => {
  // validate before adding a user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { displayName, email, password } = req.body;

  // check if email already exist
  const selectQuery = `SELECT email FROM users WHERE email = '${email}' LIMIT 1`;
  const [emailExist] = await db.query(selectQuery) ;
  if (emailExist.length) return res.status(400).send('Email already exist');
    
  // Hash password
  const cryptedPassword = await hashPassword(password);

  // get random 4 digits
  const tag = Math.floor(Math.random() * (9999 - 1000) + 1000);
  
  // random avatat (for now some random image)
  const avatar = `https://discord-aws-bucket.s3.amazonaws.com/defaultAvatars/${defaultAvatars[Math.floor(Math.random() * 6)]}.png`;
  // creating new user in database
  const insertQuery = 'INSERT INTO users (name, tag, avatar, email, birthday, password) VALUES (?, ?, ?, ?, ?, ?)';
  await db.query(insertQuery, [displayName, tag, avatar, email, '1997-09-13', cryptedPassword])
});


router.post('/login', async (req, res) => {
  // validate before adding a user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send({ 
    failed: error.details[0].type === 'string.empty' ? 
    'this field is required' : error.details[0].type === 'string.email' ? 
    'must be a valid email' : 'too many or not enough characters',
    key: error?.details[0]?.context?.key
  });
  console.log('1');
  const { email, password } = req.body;
  
  // check if user email exist
  const findUserQuery = `SELECT id, email, password, name, tag FROM users WHERE email = '${email}' LIMIT 1`;
  const [userRows] = await db.query(findUserQuery);
  console.log('2');
  if(!userRows.length) return res.status(400).send({ failed: 'Login or password is invalid' });
  console.log('3');
  
  const user = userRows[0];
  // compare password from the clients' input and password in database
  const isMatch = await comparePasswords(password, userRows[0].password);
  console.log('4');
  if (isMatch) {
    console.log('5');
    const updateStatus = `UPDATE users SET statusId = 1 WHERE id =${userRows[0].id} LIMIT 1`;
    await db.query(updateStatus);
    // creating a token and passing it to the client
    const token = jwt.sign({ id: userRows[0].id }, process.env.TOKEN_SECRET)
    res.set({ 'auth-token': token });
    res.send({ id: user.id, name: user.name, tag: user.tag, email: user.email });
  } else return res.status(400).send({ failed: 'Login or password is invalid' });
  console.log('6');
  
})