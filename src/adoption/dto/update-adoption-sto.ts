import { adoptionStatus, gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAdoptionDto {
  @IsOptional()
  @IsNotEmpty({ message: 'DogId is required' })
  @Length(15, 15, { message: 'DogId must be equal to 15 characters' })
  dogId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'adopteeUserId is required' })
  @Length(20, 20, { message: 'adopteeUserId must be equal to 15 characters' })
  adopteeUserId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'dogOwnerUserId is required' })
  @Length(20, 20, { message: 'dogOwnerUserId must be equal to 15 characters' })
  dogOwnerUserId: string;

  @IsOptional()
  @IsEnum(adoptionStatus, { message: 'AdoptionStatus is required' })
  status: adoptionStatus;
}
