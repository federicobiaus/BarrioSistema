import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClaimCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
