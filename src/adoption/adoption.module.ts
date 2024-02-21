import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService, PrismaService],
})
export class AdoptionModule {}
