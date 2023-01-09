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

router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Post not found',
    });
  }
  res.status(StatusCodes.OK).json({
    post,
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

router.put('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;

  await post.save();
  res.status(StatusCodes.OK).json({
    message: 'Post updated successfully',
  });
});

router.delete('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  await post.destroy();
  res.status(StatusCodes.OK).json({
    message: 'Post deleted successfully',
  });
});

export default router;
