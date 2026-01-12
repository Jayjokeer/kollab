import { Schema, model, Document, Types } from 'mongoose';

export interface KollabDocument extends Document {
  ideaId: Types.ObjectId;
  goal: string;
  participants: string[];
  successCriteria: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

const KollabSchema = new Schema<KollabDocument>(
  {
    ideaId: {
      type: Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
      unique: true
    },
    goal: { type: String, required: true },
    participants: { type: [String], default: [] },
    successCriteria: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export const Kollab = model<KollabDocument>('Kollab', KollabSchema);
