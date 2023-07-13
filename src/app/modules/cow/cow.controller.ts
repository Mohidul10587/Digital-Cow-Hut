import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body;

    const result = await CowService.createCow(payloads);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create Cow',
      data: result,
    });
  }
);

const getAllCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cows = await CowService.getAllCows();
    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieve Cows',
      data: cows,
    });
  }
);

const getSingleCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const cows = await CowService.getSingleCow(id);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieve Cows',
      data: cows,
    });
  }
);

export const CowController = { createCow, getAllCows, getSingleCow };
