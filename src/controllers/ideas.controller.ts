import { Request, Response } from 'express';
import * as ideasService from '../services/ideas.service';
import { StatusCodes } from "http-status-codes";
import { successResponse } from '../helpers/success-response';
import { catchAsync } from '../errors/error-handler';

export const createIdea = catchAsync (async (req: Request, res: Response) => {
    const idea = await ideasService.createIdea(req.body);
      return successResponse(res,StatusCodes.CREATED, idea);
});

export const getIdeas = catchAsync (async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 100);

  const result = await ideasService.listIdeas(page, limit);
      return successResponse(res,StatusCodes.OK, result);
});

export const getIdeaById = catchAsync ( async (req: Request, res: Response) => {
    const ideaId = req.params.id as string;
  const idea = await ideasService.getIdeaById(ideaId);

  if (!idea) {
    return res.status(404).json({ error: 'Idea not found' });
  }
      return successResponse(res,StatusCodes.OK, idea);
});
