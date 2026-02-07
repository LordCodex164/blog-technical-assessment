"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePostAuthor = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const authorizePostAuthor = async (req, res, next) => {
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
        const post = await Post_1.default.findById(postId);
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
            res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action',
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking authorization',
        });
    }
};
exports.authorizePostAuthor = authorizePostAuthor;
//# sourceMappingURL=authorize.js.map