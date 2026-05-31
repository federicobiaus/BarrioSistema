import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum AccessTypeEnum {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

export enum VisitorTypeEnum {
  OWNER = 'OWNER',
  VISITOR = 'VISITOR',
  PROVIDER = 'PROVIDER',
}

export class CreateAccessDto {
  @IsEnum(AccessTypeEnum)
  type: AccessTypeEnum;

  @IsEnum(VisitorTypeEnum)
  visitorType: VisitorTypeEnum;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  hostOwnerId?: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  dni?: string;

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

  @IsOptional()
  @IsString()
  visitedLot?: string;

  @IsOptional()
  @IsString()
  visitedBlock?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}