import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { adoptionInterface } from './adoption.entity';
import { $Enums, adoptionStatus, dogStatus } from '@prisma/client';
import { generateUniqueAdoptionId } from 'utils/idGenerator';
import { DogService } from 'src/dog/dog.service';

export interface AdoptionServiceInterface {
  createAdoption(data: adoptionInterface): Promise<adoptionInterface>;
  updateStatus(
    adoptionId: number,
    status: adoptionStatus,
  ): Promise<adoptionInterface>;
  updateAdoption(
    data: adoptionInterface,
    adoptionId: number,
  ): Promise<adoptionInterface>;
  deleteAdoption(adoptionId: number): Promise<adoptionInterface>;
  getAdoption(adoptionId: number): Promise<adoptionInterface>;
  getAllAdoptions(): Promise<adoptionInterface[]>;
  getAdoptionsCount(): Promise<number>;
  updateStatusToAccepted(adoptionId: number): Promise<adoptionInterface>;
  updateStatusToRejected(adoptionId: number): Promise<adoptionInterface>;
  updateStatusToActive(adoptionId: number): Promise<adoptionInterface>;
  updateStatusToClosed(adoptionId: number): Promise<adoptionInterface>;
}

@Injectable()
export class AdoptionService implements AdoptionServiceInterface {
  constructor(
    private prisma: PrismaService,
    private dogService: DogService,
  ) {}

  async updateStatusToAccepted(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        status: adoptionStatus.ACCEPTED,
      },
    });
    return updatedAdoption;
  }

  async updateStatusToRejected(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        status: adoptionStatus.REJECTED,
      },
    });
    return updatedAdoption;
  }

  async updateStatusToActive(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        status: adoptionStatus.ACTIVE,
      },
    });
    if (updatedAdoption) {
      await this.dogService.updateDogStatus(
        dogStatus.ADOPTED,
        Number(updatedAdoption.dogId),
      );
    }
    return updatedAdoption;
  }

  async updateStatusToClosed(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        status: adoptionStatus.DECLINED,
      },
    });
    if (updatedAdoption) {
      await this.dogService.updateDogStatus(
        dogStatus.AVAILABLE,
        Number(updatedAdoption.dogId),
      );
    }
    return updatedAdoption;
  }

  async createAdoption(data: adoptionInterface): Promise<adoptionInterface> {
    const createdAdoption = await this.prisma.adoption.create({
      data: {
        adoptionId: generateUniqueAdoptionId(),
        dogId: data.dogId,
        status: adoptionStatus.PENDING,
        adopteeUserId: data.adopteeUserId,
        dogOwnerUserId: data.dogOwnerUserId,
      },
    });
    if (createdAdoption) {
      await this.dogService.updateDogStatus(
        dogStatus.PENDING,
        Number(data.dogId),
      );
      // dog status changed => PENDING
    }
    console.log(createdAdoption);
    return createdAdoption;
  }

  async updateStatus(
    adoptionId: number,
    status: adoptionStatus,
  ): Promise<adoptionInterface> {
    console.log(status);
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        status: status,
      },
    });

    return updatedAdoption;
  }

  async updateAdoption(
    data: adoptionInterface,
    adoptionId: number,
  ): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const updatedAdoption = await this.prisma.adoption.update({
      where: {
        id: adoptionId,
      },
      data: {
        ...data,
      },
    });
    return updatedAdoption;
  }

  async deleteAdoption(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    const deletedAdoption = await this.prisma.adoption.delete({
      where: {
        id: adoptionId,
      },
    });
    return deletedAdoption;
  }

  async getAdoption(adoptionId: number): Promise<adoptionInterface> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });
    if (!adoption) {
      console.error('Adoption is not found');
      throw new Error('Adoption is not found');
    }
    return adoption;
  }

  async getAllAdoptions(): Promise<adoptionInterface[]> {
    const adoptions = await this.prisma.adoption.findMany();
    if (!adoptions) {
      console.error('Adoptions is not found');
      throw new Error('Adoptions is not found');
    }
    return adoptions;
  }

  async getAdoptionsCount(): Promise<number> {
    const adoptions = await this.prisma.adoption.count();
    console.log(adoptions == null);
    console.log(adoptions);
    if (adoptions === null) {
      console.error('Adoptions count is not found');
      throw new Error('Adoptions count is not found');
    }
    return adoptions;
  }
}
