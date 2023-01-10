import express from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config.js';
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

router.post('/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Auth failed',
    });
  }

  const result = bcrypt.compare(req.body.password, user.password);
  if (!result) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Auth failed',
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user.id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1h',
    }
  );

  res.status(StatusCodes.OK).json({
    message: 'Auth successful',
    token,
  });
});

export default router;
