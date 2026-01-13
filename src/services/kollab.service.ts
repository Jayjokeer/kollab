import { Kollab } from '../models/kollab.model';
import { Discussion } from '../models/discussion.model';
import { Idea } from '../models/ideas.model';
import { BadRequestError, NotFoundError } from '../errors/error';

export const createKollabFromIdea = async (payload: any) => {
  const { ideaId } = payload;

  const idea = await Idea.findById(ideaId);
  if (!idea) {
    throw new NotFoundError('Idea not found');
  }

  if (idea.status !== 'approved') {
    throw new BadRequestError('Idea must be approved before creating a Kollab');
  }

  const existingKollab = await Kollab.findOne({ ideaId });
  if (existingKollab) {
    throw new BadRequestError('This idea already has a Kollab');
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
    throw new NotFoundError('Kollab not found');
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
    throw new NotFoundError('Kollab not found');
  }

  return Discussion.create({
    kollabId,
    ...payload
  });
};
