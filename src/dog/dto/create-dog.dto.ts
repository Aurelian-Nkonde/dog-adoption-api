import { gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty({ message: 'DogId is required' })
  @MinLength(2, { message: 'Name must be longer than 2 characters' })
  @MaxLength(50, { message: 'Name must be lesser than 50 characters' })
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsEnum(gender)
  gender: gender;

  @IsNotEmpty()
  @MinLength(2, { message: 'Colour must be longer than 2 characters' })
  @MaxLength(50, { message: 'Colour must be lesser than 50 characters' })
  color: string;

  @IsNotEmpty()
  disability: boolean;

  @IsNotEmpty()
  @MinLength(2, { message: 'Description must be longer than 2 characters' })
  @MaxLength(50, { message: 'Description must be lesser than 50 characters' })
  description: string;

  @IsNotEmpty({ message: 'adopteeUserId is required' })
  @Length(20, 20, { message: 'adopteeUserId must be equal to 15 characters' })
  adopteeUserId: string;

  @IsNotEmpty({ message: 'dogOwnerId is required' })
  @Length(20, 20, { message: 'dogOwnerId must be equal to 15 characters' })
  dogOwnerId: string;
}
