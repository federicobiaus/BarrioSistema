import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { Roles } from '../common/decorators/roles.decorator';

import { Role } from '../common/enums/role.enum';

import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: any,
  ) {
    // El usuario solo puede actualizar su propio perfil, o es admin
    if (currentUser.id !== id && currentUser.role !== Role.ADMIN) {
      throw new UnauthorizedException('No tienes permiso para actualizar este usuario');
    }

    return this.usersService.update(id, dto);
  }
}