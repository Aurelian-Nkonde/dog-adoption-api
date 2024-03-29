import {
  Body,
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
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get('/')
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
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('dog/update/:id')
  async updateDogDetails(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<void> {
    const { id } = request.params;
    const data: dogInterface = {
      name: updateDogDto.name,
      image: updateDogDto.image,
      color: updateDogDto.color,
      disability: updateDogDto.disability,
      description: updateDogDto.description,
      dogAdopteeId: updateDogDto.adopteeUserId,
    };
    try {
      const res = await this.dogService.updateDogDetails(data, Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('dog/update/status/:id')
  async updateDogStatus(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    const { status } = request.body;
    try {
      const res = await this.dogService.updateDogStatus(status, Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post('/')
  async createDog(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Body() createDogDto: CreateDogDto,
  ): Promise<void> {
    const data: dogInterface = {
      name: createDogDto.name,
      image: createDogDto.image,
      color: createDogDto.color,
      disability: createDogDto.disability,
      description: createDogDto.description,
      dogAdopteeId: createDogDto.adopteeUserId,
    };
    const userId = createDogDto.dogOwnerId;
    try {
      const res = await this.dogService.createDog(data, userId);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('dog/delete/:id')
  async deleteDog(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.deleteADog(Number(id));
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('all/count')
  async getAllDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.allDogsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('available/count')
  async getAvailableDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.availableDogsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('pending/count')
  async getPendingDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.pendingDogsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('adopted/count')
  async getAdoptedDogsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.dogService.adoptedDogsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
