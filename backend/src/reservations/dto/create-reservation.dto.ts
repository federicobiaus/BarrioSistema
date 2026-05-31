import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum ReservationTypeEnum {
  CLUBHOUSE = 'CLUBHOUSE',
  FOOTBALL = 'FOOTBALL',
  VOLLEY = 'VOLLEY',
}

export enum ClubHouseWingEnum {
  EAST = 'EAST',
  WEST = 'WEST',
}

export class CreateReservationDto {
  @IsEnum(ReservationTypeEnum)
  type: ReservationTypeEnum;

  @IsOptional()
  @IsEnum(ClubHouseWingEnum)
  wing?: ClubHouseWingEnum;

  @IsString()
  ownerId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  @Min(1)
  peopleCount: number;
}