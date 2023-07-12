import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { ICow } from './cow.interface';
import { UserService } from './cow.service';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body;

    const result = await UserService.createCow(payloads);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create Cow',
      data: result,
    });
  }
);

export const CowController = { createCow };
