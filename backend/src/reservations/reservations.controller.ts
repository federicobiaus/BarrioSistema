import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { Role } from '../common/enums/role.enum';

import { CreateReservationPrismaDto } from './dto/create-reservation-prisma.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(
    private readonly reservationsService:
      ReservationsService,
  ) {}

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateReservationPrismaDto) {
    return this.reservationsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.reservationsService.cancel(id);
  }


}