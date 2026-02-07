"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
/**
 * Optional authentication middleware
 * Doesn't fail if no token is provided, but populates req.user if valid token exists
 */
const optionalAuthenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // No token provided, continue without authentication
            return next();
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            const user = await User_1.default.findById(decoded.userId);
            if (user) {
                req.user = user;
            }
        }
        catch (error) {
            // Invalid token, continue without authentication
            // Don't fail the request
        }
        next();
    }
    catch (error) {
        // Continue without authentication on any error
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
//# sourceMappingURL=optionalAuth.js.map