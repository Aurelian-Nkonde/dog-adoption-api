import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { notificationInterface } from './notification.entity';
import { generateUniqueNotificationId } from 'utils/idGenerator';
import { notificationStatus } from '@prisma/client';

export interface notifactionServiceInterface {
  createNotification(
    data: notificationInterface,
  ): Promise<notificationInterface>;
  deleteNotification(notificationId: number): Promise<notificationInterface>;
  readNotification(
    notificationId: number,
  ): Promise<notifactionServiceInterface>;
  findNotification(notificationId: number): Promise<notificationInterface>;
  findAllNotifications(): Promise<notificationInterface[]>;
  findAllUnreadNotification(): Promise<notificationInterface[]>;
  findAllReadNotification(): Promise<notificationInterface[]>;
  findTotalOfAllNotifications(): Promise<number>;
  findTotalOfReadNotifications(): Promise<number>;
  findTotalOfUnreadNotifications(): Promise<number>;
}

@Injectable()
export class NotificationService implements notifactionServiceInterface {
  constructor(private prisma: PrismaService) {}
  async createNotification(
    data: notificationInterface,
  ): Promise<notificationInterface> {
    const createdNotification = await this.prisma.notification.create({
      data: {
        notificationId: generateUniqueNotificationId(),
        status: notificationStatus.PENDING,
        userId: data.userId,
        type: data.type,
      },
    });
    return createdNotification;
  }

  async deleteNotification(
    notificationId: number,
  ): Promise<notificationInterface> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      console.error('Notification is not found');
      throw new Error('Notification is not found');
    }
    const deletedNotification = await this.prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });
    return deletedNotification;
  }

  async readNotification(
    notificationId: number,
  ): Promise<notifactionServiceInterface> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      console.error('Notification is not found');
      throw new Error('Notification is not found');
    }
    const readNotifi = await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        status: notificationStatus.OPENED,
      },
    });
    console.log(readNotifi);
    return 
  }

  async findNotification(
    notificationId: number,
  ): Promise<notificationInterface> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      console.error('Notification is not found');
      throw new Error('Notification is not found');
    }
    return notification;
  }

  async findAllNotifications(): Promise<notificationInterface[]> {
    const notifications = this.prisma.notification.findMany();
    if (!notifications) {
      console.error('Notifications is not found');
      throw new Error('Notifications is not found');
    }
    return notifications;
  }

  async findAllUnreadNotification(): Promise<notificationInterface[]> {
    const notifications = this.prisma.notification.findMany({
      where: {
        status: notificationStatus.PENDING,
      },
    });
    if (!notifications) {
      console.error('pending notifications is not found');
      throw new Error('pending notifications is not found');
    }
    return notifications;
  }

  async findAllReadNotification(): Promise<notificationInterface[]> {
    const notifications = this.prisma.notification.findMany({
      where: {
        status: notificationStatus.OPENED,
      },
    });
    if (!notifications) {
      console.error('pending notifications is not found');
      throw new Error('pending notifications is not found');
    }
    return notifications;
  }

  async findTotalOfAllNotifications(): Promise<number> {
    const notificationsCount = this.prisma.notification.count();
    if (notificationsCount === null) {
      console.error('notifications count is not found');
      throw new Error('notifications count is not found');
    }
    return notificationsCount;
  }

  async findTotalOfReadNotifications(): Promise<number> {
    const notificationsCount = this.prisma.notification.count({
      where: {
        status: notificationStatus.OPENED,
      },
    });
    if (notificationsCount === null) {
      console.error('notifications count is not found');
      throw new Error('notifications count is not found');
    }
    return notificationsCount;
  }

  async findTotalOfUnreadNotifications(): Promise<number> {
    const notificationsCount = this.prisma.notification.count({
      where: {
        status: notificationStatus.PENDING,
      },
    });
    if (notificationsCount === null) {
      console.error('notifications count is not found');
      throw new Error('notifications count is not found');
    }
    return notificationsCount;
  }
}
