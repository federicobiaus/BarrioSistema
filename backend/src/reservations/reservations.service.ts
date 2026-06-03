import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateReservationPrismaDto } from './dto/create-reservation-prisma.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationStatus } from '@prisma/client';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      include: { person: true },
      orderBy: { date: 'desc' },
    });
  }

  async create(data: CreateReservationPrismaDto): Promise<Reservation> {
    // Ensure person exists
    const person = await this.prisma.person.findUnique({ where: { id: data.personId } });
    if (!person) throw new NotFoundException('Person not found');

    const reservation = await this.prisma.reservation.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        type: data.type,
        date: new Date(data.date),
        person: { connect: { id: data.personId } },
      },
      include: { person: true },
    });

    return reservation;
  }

  async update(id: string, data: UpdateReservationDto): Promise<Reservation> {
    const existing = await this.prisma.reservation.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Reservation not found');

    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.type !== undefined) payload.type = data.type;
    if (data.date !== undefined) payload.date = new Date(data.date);
    if (data.status !== undefined) payload.status = data.status as ReservationStatus;

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: payload,
      include: { person: true },
    });

    return updated;
  }

  async cancel(id: string, user: any): Promise<Reservation> {
    const existing = await this.prisma.reservation.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Reservation not found');

    if (user.role !== Role.ADMIN && existing.personId !== user.personId) {
      throw new ForbiddenException('No tiene permisos para cancelar esta reserva');
    }

    if (existing.status === 'CANCELLED') {
      throw new BadRequestException('Reservation already cancelled');
    }

    const cancellationDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (existing.date <= cancellationDeadline) {
      throw new BadRequestException('No se puede cancelar una reserva dentro de las 24 horas previas al evento');
    }

    const cancelled = await this.prisma.reservation.update({
      where: { id },
      data: { status: ReservationStatus.CANCELLED },
      include: { person: true },
    });

    return cancelled;
  }
  
}