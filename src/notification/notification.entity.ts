import { notificationStatus, notificationType } from '@prisma/client';

export interface notificationInterface {
  id?: number;
  notificationId: string;
  status: notificationStatus;
  userId: string;
  type: notificationType;
}
