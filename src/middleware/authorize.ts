import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import logger from '../utils/logger';

export const authorizePostAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    // Check if post is soft deleted
    if (post.deletedAt) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    // Check if user is the author
    if (post.author.toString() !== userId.toString()) {
      logger.warn('Unauthorized post access attempt', {
        postId,
        userId: userId.toString(),
        postAuthorId: post.author.toString(),
        path: req.path,
        method: req.method,
      });
      res.status(403).json({
        success: false,
        message: 'You are not authorized to perform this action',
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking authorization',
    });
  }
};
