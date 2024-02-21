import { adoptionStatus } from '@prisma/client';

export interface adoptionInterface {
  id?: number;
  adoptionId: string;
  dogId: string;
  status: adoptionStatus;
  adopteeUserId: string;
  dogOwnerUserId: string;
}
