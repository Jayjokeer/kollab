import { Schema, model, Document, Types } from 'mongoose';

export interface DiscussionDocument extends Document {
  kollabId: Types.ObjectId;
  message: string;
  author: string;
  createdAt: Date;
}

const DiscussionSchema = new Schema<DiscussionDocument>(
  {
    kollabId: {
      type: Schema.Types.ObjectId,
      ref: 'Kollab',
      required: true,
      index: true
    },
    message: { type: String, required: true },
    author: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

export const Discussion = model<DiscussionDocument>(
  'Discussion',
  DiscussionSchema
);
