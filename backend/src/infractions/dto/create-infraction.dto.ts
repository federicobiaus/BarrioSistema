import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum InfractionTypeEnum {
  SPEED = 'SPEED',
  BEHAVIOR = 'BEHAVIOR',
  DAMAGES = 'DAMAGES',
  OTHER = 'OTHER',
}

export enum InfractionSeverityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum InfractionTargetTypeEnum {
  OWNER = 'OWNER',
  VISITOR = 'VISITOR',
  PROVIDER = 'PROVIDER',
}

export class CreateInfractionDto {
  @IsEnum(InfractionTypeEnum)
  type: InfractionTypeEnum;

  @IsEnum(InfractionSeverityEnum)
  severity: InfractionSeverityEnum;

  @IsEnum(InfractionTargetTypeEnum)
  targetType: InfractionTargetTypeEnum;

  @IsString()
  @MaxLength(3000)
  details: string;

  @IsOptional()
  @IsNumber()
  fineAmount?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsDateString()
  occurredAt: string;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsBoolean()
  accessBlocked?: boolean;

  @IsOptional()
  @IsBoolean()
  reservationBlocked?: boolean;

  @IsOptional()
  @IsBoolean()
  claimsBlocked?: boolean;
}