import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

const router = express.Router();

router.get('/', (req, res) => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Post 1 content',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Post 2 content',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'Post 3 content',
    },
  ];
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
