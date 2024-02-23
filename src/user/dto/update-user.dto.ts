import { gender } from '@prisma/client';
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

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'FirstName is required' })
  @MinLength(2, { message: 'FirstName must be greater than 2 characters' })
  @MaxLength(50, { message: 'FirstName must be lesser than 50 characters' })
  firstName: string;

  @IsOptional()
  @IsNotEmpty({ message: 'LastName is required' })
  @MinLength(2, { message: 'LastName must be greater than 2 characters' })
  @MaxLength(50, { message: 'LastName must be lesser than 50 characters' })
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'PhoneNumber is required' })
  @Length(10, 10, { message: 'PhoneNumber length must be 10' })
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Province is required' })
  @MinLength(2, { message: 'Province must be greater than 2 characters' })
  @MaxLength(50, { message: 'Province must be lesser than 50 characters' })
  province: string;

  @IsOptional()
  @IsNotEmpty({ message: 'City is required' })
  @MinLength(2, { message: 'City must be greater than 2 characters' })
  @MaxLength(50, { message: 'City must be lesser than 50 characters' })
  city: string;

  @IsOptional()
  //   @IsNumber()
  @Length(4, 4, { message: 'Year must be 4 digits' })
  yearBorn: string;
}
