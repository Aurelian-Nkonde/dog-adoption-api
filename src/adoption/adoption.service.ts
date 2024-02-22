import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { adoptionInterface } from './adoption.entity';
import { $Enums, adoptionStatus } from '@prisma/client';
import { generateUniqueAdoptionId } from 'utils/idGenerator';

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
}

@Injectable()
export class AdoptionService implements AdoptionServiceInterface {
  constructor(private prisma: PrismaService) {}
  async createAdoption(data: adoptionInterface): Promise<adoptionInterface> {
    const createdAdoption = await this.prisma.adoption.create({
      data: {
        adoptionId: generateUniqueAdoptionId(),
        dogId: data.dogId,
        status: data.status,
        adopteeUserId: data.adopteeUserId,
        dogOwnerUserId: data.dogOwnerUserId,
      },
    });
    console.log(createdAdoption);
    return createdAdoption;
  }

  async updateStatus(
    adoptionId: number,
    status: adoptionStatus,
  ): Promise<adoptionInterface> {
    console.log(status)
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
    console.log(adoptions == null)
    console.log(adoptions)
    if (adoptions === null) {
      console.error('Adoptions count is not found');
      throw new Error('Adoptions count is not found');
    }
    return adoptions;
  }
}
