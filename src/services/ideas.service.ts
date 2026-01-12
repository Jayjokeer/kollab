import { Idea, IdeaDocument } from "../models/ideas.model";

export const createIdea = async (
  payload: Partial<IdeaDocument>
): Promise<IdeaDocument> => {
  return Idea.create(payload);
};

export const listIdeas = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [ideas, total] = await Promise.all([
    Idea.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Idea.countDocuments()
  ]);

  return {
    data: ideas,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getIdeaById = async (id: string) => {
  return Idea.findById(id);
};
