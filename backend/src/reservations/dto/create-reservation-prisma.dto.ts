import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';
import { ReservationType } from '@prisma/client';

export class CreateReservationPrismaDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ReservationType)
  type: ReservationType;

  @IsDateString()
  date: string;

  @IsString()
  personId: string;
}
