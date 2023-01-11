import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post-controller.js';

import checkAuth from '../middleware/check-auth.js';
import extractFile from '../middleware/file.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', checkAuth, extractFile, createPost);

router.put('/:id', checkAuth, extractFile, updatePost);

router.delete('/:id', checkAuth, deletePost);

export default router;
