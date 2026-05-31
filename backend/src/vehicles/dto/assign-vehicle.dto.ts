import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AssignVehicleDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}