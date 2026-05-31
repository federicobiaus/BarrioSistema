import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1500)
  description: string;

}