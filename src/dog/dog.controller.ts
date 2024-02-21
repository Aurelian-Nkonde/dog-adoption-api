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
import { DogService } from './dog.service';
import { dogInterface } from './dog.entity';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface dogsControllerInterface {
  getAllDogs(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  getDog(request, response, next): Promise<void>;
}

@Controller('dogs')
export class DogController implements dogsControllerInterface {
  constructor(private readonly dogService: DogService) {}

  async getAllDogs(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const dogsResponse = await this.dogService.findAllDogs();
      response.status(HttpStatus.OK).json(dogsResponse);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('dog/:id')
  async getDog(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.findSingleDog(Number(id));
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('dog/:id')
  async updateDogDetails(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    const { data } = request.body;
    try {
      const res = await this.dogService.updateDogDetails(data, Number(id));
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('dog/status/:id')
  async updateDogStatus(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    const { status } = request.body;
    try {
      const res = await this.dogService.updateDogDetails(status, Number(id));
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post('dog')
  async createDog(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { data, userId } = request.body;
    try {
      const res = await this.dogService.createDog(data, userId);
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('dog/:id')
  async deleteDog(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.deleteADog(Number(id));
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('dog/all/count')
  async getAllDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.allDogsCount();
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('dog/all/count')
  async getAvailableDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.availableDogsCount();
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('dog/pending/count')
  async getPendingDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.pendingDogsCount();
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('dog/adopted/count')
  async getAdoptedDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.adoptedDogsCount();
      response.status(HttpStatus.OK).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
