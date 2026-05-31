import {
  IsEnum,
} from 'class-validator';

export enum ClaimStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

export class CloseClaimDto {
  @IsEnum(ClaimStatusEnum)
  status: ClaimStatusEnum;
}