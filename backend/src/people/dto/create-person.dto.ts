import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export enum PersonType {
  OWNER = 'OWNER',
  PROVIDER = 'PROVIDER',
  VISITOR = 'VISITOR',
  GUARD = 'GUARD',
}

export class CreatePersonDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  dni: string;

  @IsEnum(PersonType)
  type: PersonType;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  ownerId?: string; // relación opcional

  @IsOptional()
  @IsString()
  lot?: string;

  @IsOptional()
  @IsString()
  block?: string;

  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  color?: string;
}