import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const res = await this.userService.findAllUsers();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post('/')
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { data } = request.body;
    try {
      const res = await this.userService.createUser(data);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('user/:id')
  async getUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.userService.findUser(Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('user/update/:id')
  async updateUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    const { data } = request.body;
    try {
      const res = await this.userService.updateUser(data, Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('user/delete/:id')
  async deleteUser(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.userService.deleteUser(Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('total/count')
  async allUsersCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const res = await this.userService.getUsersCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
