import express from 'express';
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { authenticate } from '../middleware/auth';
import { optionalAuthenticate } from '../middleware/optionalAuth';
import { authorizePostAuthor } from '../middleware/authorize';
import {
  createPostValidator,
  updatePostValidator,
} from '../validators/postValidator';

const router = express.Router();

router.get('/', optionalAuthenticate, getPosts);
router.get('/:slug', optionalAuthenticate, getPostBySlug);

// Protected routes (require authentication)
router.post('/', authenticate, createPostValidator, createPost);
router.put('/:id', authenticate, authorizePostAuthor, updatePostValidator, updatePost);
router.delete('/:id', authenticate, authorizePostAuthor, deletePost);

export default router;
