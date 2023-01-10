import express from 'express';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';
import checkAuth from '../middleware/check-auth.js';

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
  const pagesize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let posts;
  if (pagesize && currentPage) {
    posts = await Post.findAll({
      limit: pagesize,
      offset: pagesize * (currentPage - 1),
    });
  } else {
    posts = await Post.findAll();
  }
  const totalItems = await Post.count();
  res.status(StatusCodes.OK).json({
    message: 'Posts fetched successfully',
    posts,
    maxPosts: totalItems,
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
  checkAuth,
  multer({ storage: storage }).single('image'),
  async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.userData.userId,
    });
    await post.save();
    res.status(StatusCodes.CREATED).json({
      message: 'Post created successfully',
      post,
    });
  }
);

router.put(
  '/:id',
  checkAuth,
  multer({ storage: storage }).single('image'),
  async (req, res) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const post = await Post.findByPk(req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    post.imagePath = imagePath;

    await post.save();
    res.status(StatusCodes.OK).json({
      message: 'Post updated successfully',
      post,
    });
  }
);

router.delete('/:id', checkAuth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  await post.destroy();
  res.status(StatusCodes.OK).json({
    message: 'Post deleted successfully',
  });
});

export default router;
