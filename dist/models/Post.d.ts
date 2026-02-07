import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost, {}, {}> & IPost & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Post.d.ts.map