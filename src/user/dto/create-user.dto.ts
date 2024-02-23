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

export class CreateUserDto {
  @IsNotEmpty({ message: 'FirstName is required' })
  @MinLength(2, { message: 'FirstName must be greater than 2 characters' })
  @MaxLength(50, { message: 'FirstName must be lesser than 50 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'LastName is required' })
  @MinLength(2, { message: 'LastName must be greater than 2 characters' })
  @MaxLength(50, { message: 'LastName must be lesser than 50 characters' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'PhoneNumber is required' })
  @Length(10, 10, { message: 'PhoneNumber length must be 10' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Province is required' })
  @MinLength(2, { message: 'Province must be greater than 2 characters' })
  @MaxLength(50, { message: 'Province must be lesser than 50 characters' })
  province: string;

  @IsNotEmpty({ message: 'City is required' })
  @MinLength(2, { message: 'City must be greater than 2 characters' })
  @MaxLength(50, { message: 'City must be lesser than 50 characters' })
  city: string;

  @IsEnum(gender, { message: 'Gender must match' })
  gender: gender;

//   @IsNumber()
  @Length(4, 4, { message: 'Year must be 4 digits' })
  yearBorn: string;
}
