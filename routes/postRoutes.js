import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.status(StatusCodes.OK).json({
    message: 'Posts fetched successfully',
    posts,
  });
});

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.status(StatusCodes.CREATED).json({
    message: 'Post created successfully',
  });
});

export default router;
