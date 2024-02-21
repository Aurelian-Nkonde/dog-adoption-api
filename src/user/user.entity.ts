import { gender } from "@prisma/client";

export interface UserInterface {
  id?: number;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  province: string;
  city: string;
  gender: gender;
  yearBorn: number;
}
