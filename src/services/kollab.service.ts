import { Kollab } from '../models/kollab.model';
import { Discussion } from '../models/discussion.model';
import { Idea } from '../models/ideas.model';

export const createKollabFromIdea = async (payload: any) => {
  const { ideaId } = payload;

  const idea = await Idea.findById(ideaId);
  if (!idea) {
    throw new Error('Idea not found');
  }

  if (idea.status !== 'approved') {
    throw new Error('Idea must be approved before creating a Kollab');
  }

  const existingKollab = await Kollab.findOne({ ideaId });
  if (existingKollab) {
    throw new Error('This idea already has a Kollab');
  }

  return Kollab.create(payload);
};

export const getKollabWithDiscussions = async (
  kollabId: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const kollab = await Kollab.findById(kollabId).populate('ideaId');
  if (!kollab) {
    throw new Error('Kollab not found');
  }

  const [discussions, total] = await Promise.all([
    Discussion.find({ kollabId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit),
    Discussion.countDocuments({ kollabId })
  ]);

  return {
    kollab,
    discussions: {
      data: discussions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  };
};

export const addDiscussionToKollab = async (
  kollabId: string,
  payload: any
) => {
  const kollab = await Kollab.findById(kollabId);
  if (!kollab) {
    throw new Error('Kollab not found');
  }

  return Discussion.create({
    kollabId,
    ...payload
  });
};
