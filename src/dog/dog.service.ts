import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { dogInterface } from './dog.entity';
import { dogStatus } from '@prisma/client';
import { generateUniqueDogId } from 'utils/idGenerator';

export interface dogsServiceInterface {
  findAllDogs(): Promise<dogInterface[]>;
  findSingleDog(dogIds: number): Promise<dogInterface>;
  updateDogDetails(data: any, dogId: number): Promise<dogInterface>;
  updateDogStatus(status: dogStatus, dogId: number): Promise<dogInterface>;
  createDog(data: dogInterface, dogOwner: string): Promise<dogInterface>;
  deleteADog(dogId: number): Promise<dogInterface>;
  allDogsCount(): Promise<number>;
  availableDogsCount(): Promise<number>;
  pendingDogsCount(): Promise<number>;
  adoptedDogsCount(): Promise<number>;
}

@Injectable()
export class DogService implements dogsServiceInterface {
  constructor(private prisma: PrismaService) {}

  async findAllDogs(): Promise<dogInterface[]> {
    const dogs = await this.prisma.dog.findMany();
    if (!dogs) {
      console.error('Dogs is not found');
      throw new Error('Dogs is not found');
    }
    return dogs;
  }

  async findSingleDog(dogIds: number): Promise<dogInterface> {
    const dog = await this.prisma.dog.findUnique({
      where: {
        id: dogIds,
      },
    });
    if (!dog) {
      console.error('Dog is not found');
      throw new Error('Dog is not found');
    }
    return dog;
  }

  async updateDogDetails(data: any, dogId: number): Promise<dogInterface> {
    const dog = await this.prisma.dog.findUnique({
      where: {
        id: dogId,
      },
    });
    if (!dog) {
      console.error('Dog is not found');
      throw new Error('Dog is not found');
    }
    const updatedDog = await this.prisma.dog.update({
      where: { id: dogId },
      data: {
        ...data,
      },
    });
    return updatedDog;
  }

  async updateDogStatus(
    status: dogStatus,
    dogId: number,
  ): Promise<dogInterface> {
    const dog = await this.prisma.dog.findUnique({
      where: {
        id: dogId,
      },
    });
    if (!dog) {
      console.error('Dog is not found');
      throw new Error('Dog is not found');
    }
    const updatedDog = await this.prisma.dog.update({
      where: { id: dogId },
      data: {
        status: status,
      },
    });
    return updatedDog;
  }

  async createDog(data: dogInterface, dogOwner: string): Promise<dogInterface> {
    const checkDogExistance = await this.prisma.dog.findFirst({
      where: {
        name: data.name,
        color: data.color,
        gender: data.gender,
        disability: data.disability,
      },
    });
    if (checkDogExistance) {
      console.error('The dog already exists');
      throw new BadRequestException('Dog already exists');
    }
    const createdNewDog = await this.prisma.dog.create({
      data: {
        name: data.name,
        dogId: generateUniqueDogId(),
        image: data.image,
        status: 'AVAILABLE',
        gender: data.gender,
        color: data.color,
        disability: data.disability,
        description: data.description,
        dogOwnerId: dogOwner,
        dogAdopteeId: data.dogAdopteeId,
      },
    });
    console.log(createdNewDog);
    return createdNewDog;
  }

  async deleteADog(dogId: number): Promise<dogInterface> {
    const dog = await this.prisma.dog.findUnique({
      where: {
        id: dogId,
      },
    });
    if (!dog) {
      console.error('Dog is not found');
      throw new Error('Dog is not found');
    }
    const deletedDog = await this.prisma.dog.delete({
      where: {
        id: dogId,
      },
    });
    console.log(dog);
    return deletedDog;
  }

  async allDogsCount(): Promise<number> {
    const dogsCount = await this.prisma.dog.count();
    if (dogsCount === null) {
      console.error('Dogs count is not found');
      throw new Error('Dogs count is not found');
    }
    console.log(dogsCount);
    return dogsCount;
  }

  async availableDogsCount(): Promise<number> {
    const dogsCount = await this.prisma.dog.count({
      where: {
        status: dogStatus.AVAILABLE,
      },
    });
    if (dogsCount === null) {
      console.error('available dogs count is not found');
      throw new Error('available dogs count is not found');
    }
    console.log(dogsCount);
    return dogsCount;
  }

  async pendingDogsCount(): Promise<number> {
    const dogsCount = await this.prisma.dog.count({
      where: {
        status: dogStatus.PENDING,
      },
    });
    if (dogsCount === null) {
      console.error('pending dogs count is not found');
      throw new Error('pending dogs count is not found');
    }
    console.log(dogsCount);
    return dogsCount;
  }

  async adoptedDogsCount(): Promise<number> {
    const dogsCount = await this.prisma.dog.count({
      where: {
        status: dogStatus.ADOPTED,
      },
    });
    if (dogsCount === null) {
      console.error('adopted dogs count is not found');
      throw new Error('adopted dogs count is not found');
    }
    console.log(dogsCount);
    return dogsCount;
  }
}
