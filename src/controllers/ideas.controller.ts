import { Request, Response } from 'express';
import * as ideasService from '../services/ideas.service';

export const createIdea = async (req: Request, res: Response) => {
  try {
    const idea = await ideasService.createIdea(req.body);
    res.status(201).json(idea);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getIdeas = async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 100);

  const result = await ideasService.listIdeas(page, limit);
  res.json(result);
};

export const getIdeaById = async (req: Request, res: Response) => {
    const ideaId = req.params.id as string;
  const idea = await ideasService.getIdeaById(ideaId);

  if (!idea) {
    return res.status(404).json({ error: 'Idea not found' });
  }

  res.json(idea);
};
