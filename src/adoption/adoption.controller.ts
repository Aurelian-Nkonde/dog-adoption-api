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
import { AdoptionService } from './adoption.service';
import { NextFunction, Request, Response } from 'express';

@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('/')
  async createAdoption(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { data } = request.body;
    try {
      const resp = await this.adoptionService.createAdoption(data);
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('adoption/status/accepted/:id')
  async updateAdoptionStatusAccepted(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.updateStatusToAccepted(
        Number(id),
      );
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('adoption/status/rejected/:id')
  async updateAdoptionStatusRejected(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.updateStatusToRejected(
        Number(id),
      );
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('adoption/status/active/:id')
  async updateAdoptionStatusActive(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.updateStatusToActive(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('adoption/status/closed/:id')
  async updateAdoptionStatusClosed(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.updateStatusToClosed(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('adoption/update/:id')
  async updateAdoption(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    const { data } = request.body;
    try {
      const resp = await this.adoptionService.updateAdoption(data, Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('adoption/delete/:id')
  async deleteAdoption(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.deleteAdoption(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('adoption/:id')
  async getAdoption(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.adoptionService.getAdoption(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('/')
  async getAllAdoption(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.adoptionService.getAllAdoptions();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('total/count')
  async getAllAdoptionCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.adoptionService.getAdoptionsCount();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
