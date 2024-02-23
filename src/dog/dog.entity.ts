import { dogStatus, gender } from '@prisma/client';

export interface dogInterface {
  id?: number;
  name: string;
  dogId?: string;
  image: string;
  status?: dogStatus;
  gender?: gender;
  color: string;
  disability: boolean;
  description: string;
  dogOwnerId?: string;
  dogAdopteeId: string;
}
