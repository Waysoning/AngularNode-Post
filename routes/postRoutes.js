import express from 'express';
import { StatusCodes } from 'http-status-codes';

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
    meassges: 'Posts fetched successfully',
    posts,
  });
});

export default router;
