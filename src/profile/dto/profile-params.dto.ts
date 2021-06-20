import { IsNotEmpty, IsString, IsAlphanumeric } from 'class-validator';

export class ProfileParamsDTO {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  username: string;
}
