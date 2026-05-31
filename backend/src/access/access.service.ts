import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateAccessDto } from './dto/create-access.dto';
import { AccessType } from '@prisma/client';
import type { Person } from '@prisma/client';

@Injectable()
export class AccessService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findPersonByIdentifier(dni?: string, fullName?: string) {
    if (!dni && !fullName) {
      throw new BadRequestException('Se requiere dni o fullName');
    }

    let person: Person | null = null;

    if (dni) {
      person = await this.prisma.person.findUnique({ where: { dni } });
    }

    if (!person && fullName) {
      const parts = fullName.trim().split(' ');
      const firstName = parts.shift() || '';
      const lastName = parts.join(' ');

      person = await this.prisma.person.findFirst({
        where: {
          firstName,
          lastName,
        },
      });
    }

    if (!person) {
      throw new BadRequestException('Persona no encontrada');
    }

    return person;
  }

  async getPersonWithLastAccess(dni?: string, fullName?: string) {
    const person = await this.findPersonByIdentifier(dni, fullName);

    const lastAccess = await this.prisma.accessLog.findFirst({
      where: { personId: person.id },
      orderBy: { createdAt: 'desc' },
    });

    return { person, lastAccess };
  }

  async createAccess(dto: CreateAccessDto, registeredById: string) {
    // Resolve person
    let person: Person | null = null;

    if (dto.ownerId) {
      person = await this.prisma.person.findUnique({ where: { id: dto.ownerId } });
    }

    if (!person && dto.dni) {
      person = await this.prisma.person.findUnique({ where: { dni: dto.dni } });
    }

    if (!person && dto.lastName) {
      person = await this.prisma.person.findFirst({ where: { lastName: dto.lastName } });
    }

    if (!person) {
      throw new BadRequestException('Persona no encontrada para asociar el AccessLog');
    }

    if (dto.visitorType === 'VISITOR' && (!dto.visitedLot || !dto.visitedBlock)) {
      throw new BadRequestException('Lote y Manzana son obligatorios para visitas');
    }

    // Optional vehicle
    let vehicleId: string | undefined = undefined;
    if (dto.plate) {
      let vehicle = await this.prisma.vehicle.findUnique({ where: { plate: dto.plate } });
      if (!vehicle) {
        vehicle = await this.prisma.vehicle.create({
          data: {
            plate: dto.plate,
            brand: dto.brand || null,
            model: dto.model || null,
            color: dto.color || null,
            personId: person.id,
          },
        });
      }
      vehicleId = vehicle.id;
    }

    const data: any = {
      type: dto.type as AccessType,
      personId: person.id,
      registeredById,
      personName: `${person.firstName} ${person.lastName}`,
      personDni: person.dni,
      visitorType: dto.visitorType,
      visitedLot: dto.visitedLot || null,
      visitedBlock: dto.visitedBlock || null,
    };

    if (vehicleId) data.vehicleId = vehicleId;
    if (dto.plate) data.vehiclePlate = dto.plate;

    const created = await this.prisma.accessLog.create({ data });

    // Update person's isInside state based on access type
    try {
      await this.prisma.person.update({
        where: { id: person.id },
        data: { isInside: dto.type === 'ENTRY' },
      });
    } catch (e) {
      // ignore update errors but log if needed in future
    }

    return created;
  }

  async exitAccess(accessLogId: string, registeredById: string) {
    const existing = await this.prisma.accessLog.findUnique({ where: { id: accessLogId } });
    if (!existing) throw new BadRequestException('AccessLog no encontrado');

    const updated = await this.prisma.accessLog.update({
      where: { id: accessLogId },
      data: { type: 'EXIT' as AccessType, registeredById },
    });

    // Mark person as outside
    try {
      await this.prisma.person.update({
        where: { id: existing.personId },
        data: { isInside: false },
      });
    } catch (e) {
      // ignore update errors
    }

    return updated;
  }

}
