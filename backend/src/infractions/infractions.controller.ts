import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { InfractionsService } from './infractions.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { Role } from '../common/enums/role.enum';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateInfractionDto } from './dto/create-infraction.dto';

import { CloseInfractionDto } from './dto/close-infraction.dto';

@Controller('infractions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InfractionsController {
  constructor(
    private readonly infractionsService:
      InfractionsService,
  ) {}


}