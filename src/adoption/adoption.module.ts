import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PrismaService } from 'src/prisma.service';
import { DogModule } from 'src/dog/dog.module';

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService, PrismaService],
  imports: [DogModule],
  exports: []
})
export class AdoptionModule {}
