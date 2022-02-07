import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../connection.js';

export const router = express.Router();
// validations
import { registerValidation, loginValidation } from '../helper/validation.js';

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
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  
  // get random 4 digits
  const tag = Math.floor(Math.random() * (9999 - 1000) + 1000);
  
  // creating new user in database
  const insertQuery = 'INSERT INTO users (name, tag, email, birthday, password) VALUES (?, ?, ?, ?, ?)';
  const teest = await db.query(insertQuery, [displayName, tag, email, '1997-09-13', hashPassword])
  console.log(teest);
});


router.post('/login', async (req, res) => {
  // validate before adding a user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { email, password } = req.body;
  
  // check if user email exist
  const findUserQuery = `SELECT id, email, password FROM users WHERE email = '${email}' LIMIT 1`;
  const [userRows] = await db.query(findUserQuery);
  if(!userRows.length) return res.status(400).send('email or password is wrong');
  
  // compare password from the clients' input and password in database
  bcrypt.compare(password, userRows[0].password, async (err, passwordMatch) => {
    if (err) throw err;
    if (passwordMatch) {
      const updateStatus = `UPDATE users SET online = true, status = 'online' WHERE id =${userRows[0].id} LIMIT 1`;
      await db.query(updateStatus);
      // need to understand how to handle with errors with database
      // creating a token and passing it to the client
      const token = jwt.sign({ id: userRows[0].id }, process.env.TOKEN_SECRET)
      res.header('auth-token', token).json(token);
    } else return res.status(400).send('email or password is wrong');
  });

})