import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../common/enums/role.enum';
import { CreatePersonDto } from './dto/create-person.dto';
import cloudinary from '../uploads/config/cloudinary.config';

@Injectable()
export class PeopleService {
    constructor(private prisma: PrismaService) { }

    async create(
        body: CreatePersonDto & { password?: string; role?: Role } & { fullName?: string },
        file?: any,
        createdById?: string,
    ) {
        let {
            firstName,
            lastName,
            fullName,
            dni,
            type,
            ownerId,
            email,
            phone,
            password,
            role,
            photoUrl,
            lot,
            block,
            plate,
            brand,
            model,
            color,
        } = body;

        if ((!firstName || !lastName) && fullName) {
            const parts = fullName.trim().split(' ');
            firstName = parts.shift() || '';
            lastName = parts.join(' ') || '';
        }

        if (!firstName || !lastName || !dni || !type) {
            throw new BadRequestException('Missing required fields');
        }

        const exists = await this.prisma.person.findUnique({
            where: { dni },
        });

        if (exists) {
            throw new BadRequestException('DNI ya registrado');
        }

        if (type === 'OWNER') {
            if (!email) {
                throw new BadRequestException('Email requerido para crear el usuario');
            }
            if (!lot || !block) {
                throw new BadRequestException('Lote y Manzana son obligatorios para propietarios');
            }
        }

        if (type === 'OWNER' && email) {
            const userExists = await this.prisma.user.findUnique({
                where: { email },
            });

            if (userExists) {
                throw new BadRequestException('Email ya registrado');
            }
        }

        if (plate) {
            const existingVehicle = await this.prisma.vehicle.findUnique({
                where: { plate },
            });

            if (existingVehicle) {
                throw new BadRequestException('Patente ya registrada');
            }
        }

        if (file) {
            const base64 = file.buffer.toString('base64');
            const dataUri = `data:${file.mimetype};base64,${base64}`;
            const uploadResult = await cloudinary.uploader.upload(dataUri, {
                folder: 'barrio-system',
                type: 'private',
            });
            photoUrl = uploadResult.secure_url;
        }

        let userData: any = undefined;

        if (type === 'OWNER' && email) {
            const ownerPassword = password || 'User123';
            const hashedPassword = await bcrypt.hash(ownerPassword, 10);

            userData = {
                create: {
                    email,
                    password: hashedPassword,
                    role: Role.OWNER,
                    firstName,
                    lastName,
                },
            };
        }

        return this.prisma.person.create({
            data: {
                firstName,
                lastName,
                dni,
                phone: phone || null,
                email: email || null,
                lot: lot || null,
                block: block || null,
                type,
                photoUrl: photoUrl || null,
                isBlocked: false,
                isInside: false,
                createdById: createdById || null,
                user: userData,
                vehicles: plate
                    ? {
                          create: {
                              plate,
                              brand: brand || null,
                              model: model || null,
                              color: color || null,
                          },
                      }
                    : undefined,
            },
            include: {
                user: true,
                vehicles: true,
            },
        });
    }

    async findAll() {
        return this.prisma.person.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                vehicles: true,
                _count: {
                    select: {
                        claims: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.person.findUnique({
            where: { id },
            include: {
                vehicles: true,
                accessLogs: true,
                _count: {
                    select: {
                        claims: true,
                    },
                },
            },
        });
    }

    async update(
        id: string,
        body: any,
        file?: any,
        updatedById?: string,
    ) {
        const existing = await this.prisma.person.findUnique({
            where: { id },
            include: {
                user: true,
                vehicles: true,
            },
        });

        if (!existing) {
            throw new BadRequestException('Persona no encontrada');
        }

        let {
            firstName,
            lastName,
            fullName,
            dni,
            type,
            email,
            phone,
            lot,
            block,
        } = body;

        if ((!firstName || !lastName) && fullName) {
            const parts = fullName.trim().split(' ');
            firstName = parts.shift() || '';
            lastName = parts.join(' ') || '';
        }

        if (!firstName || !lastName || !dni || !type) {
            throw new BadRequestException('Missing required fields');
        }

        if (dni !== existing.dni) {
            const dniExists = await this.prisma.person.findUnique({
                where: { dni },
            });
            if (dniExists) {
                throw new BadRequestException('DNI ya registrado');
            }
        }

        if (email && email !== existing.email) {
            const emailExists = await this.prisma.person.findFirst({
                where: { email },
            });
            if (emailExists && emailExists.id !== id) {
                throw new BadRequestException('Email ya registrado');
            }
        }

        const resolvedLot = lot !== undefined ? lot : existing.lot;
        const resolvedBlock = block !== undefined ? block : existing.block;

        if (type === 'OWNER' && (!resolvedLot || !resolvedBlock)) {
            throw new BadRequestException('Lote y Manzana son obligatorios para propietarios');
        }

        if (file) {
            const base64 = file.buffer.toString('base64');
            const dataUri = `data:${file.mimetype};base64,${base64}`;
            const uploadResult = await cloudinary.uploader.upload(dataUri, {
                folder: 'barrio-system',
                type: 'private',
            });
            body.photoUrl = uploadResult.secure_url;
        }

        const updateData: any = {
            firstName,
            lastName,
            dni,
            type,
            phone: phone !== undefined ? phone || null : existing.phone,
            email: email !== undefined ? email || null : existing.email,
            lot: lot !== undefined ? lot || null : existing.lot,
            block: block !== undefined ? block || null : existing.block,
            photoUrl: body.photoUrl !== undefined ? body.photoUrl : existing.photoUrl,
        };

        return this.prisma.person.update({
            where: { id },
            data: updateData,
            include: {
                vehicles: true,
                accessLogs: true,
                _count: {
                    select: {
                        claims: true,
                    },
                },
            },
        });
    }

    async delete(id: string) {
        const existing = await this.prisma.person.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!existing) {
            throw new BadRequestException('Persona no encontrada');
        }

        await this.prisma.accessLog.deleteMany({
            where: { personId: id },
        });
        await this.prisma.vehicle.deleteMany({
            where: { personId: id },
        });
        await this.prisma.reservation.deleteMany({
            where: { personId: id },
        });
        await this.prisma.claim.deleteMany({
            where: { personId: id },
        });
        await this.prisma.user.updateMany({
            where: { personId: id },
            data: { personId: null },
        });

        return this.prisma.person.delete({
            where: { id },
        });
    }
}