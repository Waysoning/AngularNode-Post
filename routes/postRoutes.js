import express from 'express';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

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
  res.status(StatusCodes.OK).json(post);
});

router.post(
  '/',
  multer({ storage: storage }).single('image'),
  async (req, res) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.status(StatusCodes.CREATED).json({
      message: 'Post created successfully',
      post,
    });
  }
);

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
