import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserInterface } from './user.entity';
import { generateUniqueUserId } from 'utils/idGenerator';

export interface userServiceInterface {
  createUser(data: UserInterface): Promise<UserInterface>;
  findAllUsers(): Promise<UserInterface[]>;
  findUser(userId: number): Promise<UserInterface>;
  updateUser(data: any, userId: number): Promise<UserInterface>;
  deleteUser(userId: number): Promise<UserInterface>;
  getUsersCount(): Promise<number>;
}

@Injectable()
export class UserService implements userServiceInterface {
  constructor(private prisma: PrismaService) {}

  async createUser(data: UserInterface): Promise<UserInterface> {
    const checkUserExistance = await this.prisma.user.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });
    if (checkUserExistance) {
      console.error('The user already exists!');
      throw new BadRequestException('User already exists!');
    }
    const createdUser = await this.prisma.user.create({
      data: {
        userId: generateUniqueUserId(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        province: data.province,
        city: data.city,
        gender: data.gender,
        yearBorn: data.yearBorn,
      },
    });
    return createdUser;
  }

  async findAllUsers(): Promise<UserInterface[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUser(userId: number): Promise<UserInterface> {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async updateUser(data: any, userId: number): Promise<UserInterface> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<UserInterface> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }

  async getUsersCount(): Promise<number> {
    return await this.prisma.user.count();
  }
}
