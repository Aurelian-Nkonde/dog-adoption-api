import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    const data: UserInterface = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      province: createUserDto.province,
      city: createUserDto.city,
      gender: createUserDto.gender,
      yearBorn: Number(createUserDto.yearBorn),
    };
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
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
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
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { id } = request.params;
    const data: UserInterface = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
      phoneNumber: updateUserDto.phoneNumber,
      province: updateUserDto.province,
      city: updateUserDto.city,
      yearBorn: Number(updateUserDto.yearBorn),
    };
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
