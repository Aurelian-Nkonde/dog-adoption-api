import { gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdoptionDto {
  @IsNotEmpty({ message: 'DogId is required' })
  @Length(15, 15, { message: 'DogId must be equal to 15 characters' })
  dogId: string;

  @IsNotEmpty({ message: 'adopteeUserId is required' })
  @Length(20, 20, { message: 'adopteeUserId must be equal to 15 characters' })
  adopteeUserId: string;

  @IsNotEmpty({ message: 'dogOwnerUserId is required' })
  @Length(20, 20, { message: 'dogOwnerUserId must be equal to 15 characters' })
  dogOwnerUserId: string;
}
