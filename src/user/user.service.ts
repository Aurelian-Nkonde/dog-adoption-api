import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserInterface } from './user.entity';
import { generateUniqueUserId } from 'utils/idGenerator';
import { Console } from 'console';

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
    const emailExistance = await this.prisma.user.count({
      where: {
        email: data.email,
      },
    });
    if (checkUserExistance) {
      console.error('The user already exists!');
      throw new BadRequestException('User already exists!');
    }
    console.log(emailExistance);
    if (emailExistance !== 0) {
      console.error('The email already exists!');
      throw new BadRequestException('Email already exists!');
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
    if (!users) {
      console.error('Users is not found');
      throw new Error('Users is not found');
    }
    return users;
  }

  async findUser(userId: number): Promise<UserInterface> {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      console.error('User is not found');
      throw new Error('User is not found');
    }
    return user;
  }

  async updateUser(data: any, userId: number): Promise<UserInterface> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      console.error('User is not found');
      throw new Error('User is not found');
    }
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      console.error('User is not found');
      throw new Error('User is not found');
    }
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
