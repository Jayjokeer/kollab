import { Request, Response } from 'express';
import * as kollabsService from '../services/kollab.service';
import { catchAsync } from '../errors/error-handler';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../helpers/success-response';

export const createKollab =  catchAsync (async (req: Request, res: Response) => {
    const kollab = await kollabsService.createKollabFromIdea(req.body);
      return successResponse(res,StatusCodes.CREATED, kollab);

});

export const getKollabWithDiscussions = catchAsync ( async (
  req: Request,
  res: Response
) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const kollabId = req.params.id as string;

    const data = await kollabsService.getKollabWithDiscussions(
      kollabId,
      page,
      limit
    );

      return successResponse(res,StatusCodes.OK, data);
});

export const addDiscussion = catchAsync (  async (req: Request, res: Response) => {
        const kollabId = req.params.id as string;
    const discussion = await kollabsService.addDiscussionToKollab(
      kollabId,
      req.body
    );

      return successResponse(res,StatusCodes.CREATED, discussion);
});
