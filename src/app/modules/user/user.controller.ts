import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getUsers = async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get user',
    data: result,
  });
};

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const payloads = req.body;

    const result = await UserService.createUser(payloads);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create user',
      data: result,
    });
  }
);

export const UserController = { createUser, getUsers };
