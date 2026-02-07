import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import User, { IUser } from '../models/User';
import logger from '../utils/logger';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authentication attempt without token', {
        path: req.path,
        method: req.method,
      });
      res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = verifyToken(token) as JWTPayload;

    const user = await User.findById(decoded.userId).select('+password');
    if (!user) {
      logger.warn('Authentication attempt with invalid user ID', {
        userId: decoded.userId,
        path: req.path,
      });
      res.status(401).json({
        success: false,
        message: 'User not found. Token may be invalid.',
      });
      return;
    }

    logger.debug('User authenticated', {
      userId: user._id.toString(),
      email: user.email,
      path: req.path,
    });

    req.user = user;
    next();
  } catch (error: any) {
    logger.error('Authentication failed', error, {
      path: req.path,
      method: req.method,
    });
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
