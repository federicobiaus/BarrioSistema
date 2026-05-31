import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateInfractionDto } from './dto/create-infraction.dto';

import { CloseInfractionDto } from './dto/close-infraction.dto';

@Injectable()
export class InfractionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


}