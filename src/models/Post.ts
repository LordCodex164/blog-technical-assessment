import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId;
  status: 'draft' | 'published';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const PostSchema: Schema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: false,
  }
);

// Generate slug from title before saving
PostSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const baseSlug = slugify(this.title as string, { lower: true, strict: true });
    // Add timestamp to ensure uniqueness
    this.slug = `${baseSlug}-${Date.now()}`;
  }
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }

  if (this.isNew && !this.updatedAt) {
    this.updatedAt = new Date();
  }
  next();
});

// indexxing better query performance
PostSchema.index({ author: 1, status: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ deletedAt: 1 });

export default mongoose.model<IPost>('Post', PostSchema);
