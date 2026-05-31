import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  Query,
  Param,
  Req,
} from '@nestjs/common';

import { AccessService } from './access.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateAccessDto } from './dto/create-access.dto';
import type { User } from '@prisma/client';

@Controller('access')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccessController {
  constructor(
    private readonly accessService: AccessService,
  ) { }

  @Get('search')
  async search(
    @Query('dni') dni?: string,
    @Query('fullName') fullName?: string,
  ) {
    return this.accessService.getPersonWithLastAccess(dni, fullName);
  }

  @Post()
  async create(
    @Body() dto: CreateAccessDto,
    @CurrentUser() user: User,
  ) {
    return this.accessService.createAccess(dto, user.id);
  }

  @Patch(':id/exit')
  async exit(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.accessService.exitAccess(id, user.id);
  }

}