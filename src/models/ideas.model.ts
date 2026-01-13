import { Schema, model, Document } from 'mongoose';

export interface IdeaDocument extends Document {
  title: string;
  description: string;
  createdBy: string;
  status: 'draft' | 'approved' ;
  createdAt: Date;
}

const IdeaSchema = new Schema<IdeaDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'approved'],
      default: 'draft'
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

export const Idea = model<IdeaDocument>('Idea', IdeaSchema);
