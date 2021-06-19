import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsEmail,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
