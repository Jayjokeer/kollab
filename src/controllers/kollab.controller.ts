import { Request, Response } from 'express';
import * as kollabsService from '../services/kollab.service';

export const createKollab = async (req: Request, res: Response) => {
  try {
    const kollab = await kollabsService.createKollabFromIdea(req.body);
    res.status(201).json(kollab);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getKollabWithDiscussions = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const kollabId = req.params.id as string;

    const data = await kollabsService.getKollabWithDiscussions(
      kollabId,
      page,
      limit
    );

    res.json(data);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const addDiscussion = async (req: Request, res: Response) => {
  try {
        const kollabId = req.params.id as string;
    const discussion = await kollabsService.addDiscussionToKollab(
      kollabId,
      req.body
    );

    res.status(201).json(discussion);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
