import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { CloseClaimDto } from './dto/close-claim.dto';
import { CreateClaimCommentDto } from './dto/create-claim-comment.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(personId: string, dto: CreateClaimDto) {
    if (!personId) {
      throw new BadRequestException('User is not linked to a person record');
    }

    return this.prisma.claim.create({
      data: {
        title: dto.title,
        description: dto.description,
        person: { connect: { id: personId } },
      },
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });
  }

  async findByPerson(personId: string) {
    if (!personId) {
      throw new BadRequestException('User is not linked to a person record');
    }

    return this.prisma.claim.findMany({
      where: { personId },
      orderBy: { createdAt: 'desc' },
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });
  }

  async findOpenClaims() {
    return this.prisma.claim.findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });
  }

  async findOne(id: string, user: any) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (
      user.role !== Role.ADMIN &&
      user.role !== Role.GUARD &&
      claim.personId !== user.personId
    ) {
      throw new ForbiddenException('Access denied to this claim');
    }

    return claim;
  }

  async update(id: string, dto: UpdateClaimDto, user: any) {
    const claim = await this.findOne(id, user);

    if (claim.personId !== user.personId) {
      throw new ForbiddenException('Only the claim owner can update this claim');
    }

    if (claim.status === 'CLOSED') {
      throw new BadRequestException('Cannot update a closed claim');
    }

    const updateData: Record<string, unknown> = {};

    if (dto.title !== undefined) {
      updateData.title = dto.title;
    }

    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }

    return this.prisma.claim.update({
      where: { id },
      data: updateData,
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });
  }

  async close(id: string, dto: CloseClaimDto) {
    const claim = await this.prisma.claim.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    return this.prisma.claim.update({
      where: { id },
      data: { status: dto.status },
      include: {
        person: true,
        comments: { include: { author: true } },
      },
    });
  }

  async addComment(id: string, dto: CreateClaimCommentDto, user: any) {
    const claim = await this.prisma.claim.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (
      user.role !== Role.ADMIN &&
      user.role !== Role.GUARD &&
      claim.personId !== user.personId
    ) {
      throw new ForbiddenException('Cannot comment on this claim');
    }

    return this.prisma.claimComment.create({
      data: {
        content: dto.content,
        claim: { connect: { id } },
        author: { connect: { id: user.id } },
      },
      include: { author: true },
    });
  }
}
