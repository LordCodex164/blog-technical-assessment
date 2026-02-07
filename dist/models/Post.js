"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: false, // We'll handle timestamps manually
});
// Generate slug from title before saving
PostSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        const baseSlug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
        // Add timestamp to ensure uniqueness
        this.slug = `${baseSlug}-${Date.now()}`;
    }
    // Always update updatedAt when document is modified (but not on initial creation)
    if (this.isModified() && !this.isNew) {
        this.updatedAt = new Date();
    }
    // Ensure updatedAt is set even for new documents
    if (this.isNew && !this.updatedAt) {
        this.updatedAt = new Date();
    }
    next();
});
// Index for better query performance
// Note: slug index is automatically created by unique: true, so we don't need to add it explicitly
PostSchema.index({ author: 1, status: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ deletedAt: 1 });
exports.default = mongoose_1.default.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map