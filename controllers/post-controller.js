import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

const getPosts = async (req, res) => {
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
};

const getPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Post not found',
    });
  }
  res.status(StatusCodes.OK).json(post);
};

const createPost = async (req, res) => {
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
};

const updatePost = async (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = await Post.findByPk(req.params.id);
  if (post.creator !== req.userData.userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Not authorized to edit this post',
    });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  post.imagePath = imagePath;
  post.creator = req.userData.userId;

  await post.save();
  res.status(StatusCodes.OK).json({
    message: 'Post updated successfully',
    post,
  });
};

const deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  console.log(post.creator);
  console.log(req.userData.userId);
  if (post.creator !== req.userData.userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Not authorized to delete this post',
    });
  }
  await post.destroy();
  res.status(StatusCodes.OK).json({
    message: 'Post deleted successfully',
  });
};

export { getPosts, createPost, getPost, updatePost, deletePost };
