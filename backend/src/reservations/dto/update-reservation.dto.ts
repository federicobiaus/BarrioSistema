import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';
import { ReservationStatus, ReservationType } from '@prisma/client';

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ReservationType)
  type?: ReservationType;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}