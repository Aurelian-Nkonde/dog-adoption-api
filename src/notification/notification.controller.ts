import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NextFunction, Request, Response } from 'express';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  async getAllNotifications(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.notificationService.findAllNotifications();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('notification/:id')
  async deleteNotification(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.notificationService.deleteNotification(
        Number(id),
      );
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('notification/read/:id')
  async readNotification(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.notificationService.readNotification(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('notification/find/:id')
  async findNotification(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const { id } = request.params;
    try {
      const resp = await this.notificationService.findNotification(Number(id));
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('unread')
  async getAllUnreadNotifications(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.notificationService.findAllUnreadNotification();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('read')
  async getAllReadNotifications(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.notificationService.findAllReadNotification();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('all/total')
  async getAllNotificationsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp = await this.notificationService.findTotalOfAllNotifications();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('read/total')
  async getReadNotificationsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp =
        await this.notificationService.findTotalOfReadNotifications();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('unread/total')
  async getUnReadNotificationsCount(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const resp =
        await this.notificationService.findTotalOfUnreadNotifications();
      response.status(HttpStatus.OK).json(resp);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
