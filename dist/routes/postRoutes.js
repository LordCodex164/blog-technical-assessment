"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const optionalAuth_1 = require("../middleware/optionalAuth");
const authorize_1 = require("../middleware/authorize");
const postValidator_1 = require("../validators/postValidator");
const router = express_1.default.Router();
// Public routes (with optional auth for filtering drafts)
router.get('/', optionalAuth_1.optionalAuthenticate, postController_1.getPosts);
router.get('/:slug', optionalAuth_1.optionalAuthenticate, postController_1.getPostBySlug);
// Protected routes (require authentication)
router.post('/', auth_1.authenticate, postValidator_1.createPostValidator, postController_1.createPost);
router.put('/:id', auth_1.authenticate, authorize_1.authorizePostAuthor, postValidator_1.updatePostValidator, postController_1.updatePost);
router.delete('/:id', auth_1.authenticate, authorize_1.authorizePostAuthor, postController_1.deletePost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map