import {
  IsEnum,
} from 'class-validator';

export enum InfractionStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export class CloseInfractionDto {
  @IsEnum(InfractionStatusEnum)
  status: InfractionStatusEnum;
}