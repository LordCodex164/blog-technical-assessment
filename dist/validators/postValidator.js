"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidator = exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPostValidator = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((tags) => {
        if (tags && tags.length > 0) {
            const allStrings = tags.every((tag) => typeof tag === 'string');
            if (!allStrings) {
                throw new Error('All tags must be strings');
            }
        }
        return true;
    }),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage('Status must be either draft or published'),
];
exports.updatePostValidator = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Content cannot be empty'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((tags) => {
        if (tags && tags.length > 0) {
            const allStrings = tags.every((tag) => typeof tag === 'string');
            if (!allStrings) {
                throw new Error('All tags must be strings');
            }
        }
        return true;
    }),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage('Status must be either draft or published'),
];
//# sourceMappingURL=postValidator.js.map