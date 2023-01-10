import express from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hash,
  });
  await user.save();
  res.status(StatusCodes.CREATED).json({
    message: 'User created',
    result: user,
  });
});

export default router;
