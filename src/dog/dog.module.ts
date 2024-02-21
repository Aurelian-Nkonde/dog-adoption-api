import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DogController],
  providers: [DogService, PrismaService],
})
export class DogModule {}
