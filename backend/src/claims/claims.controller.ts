import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ClaimsService } from './claims.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { Role } from '../common/enums/role.enum';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { CloseClaimDto } from './dto/close-claim.dto';
import { CreateClaimCommentDto } from './dto/create-claim-comment.dto';

@Controller('claims')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClaimsController {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {}

  @Post()
  async createClaim(
    @CurrentUser() user: any,
    @Body() dto: CreateClaimDto,
  ) {
    return this.claimsService.create(user.personId, dto);
  }

  @Get('my')
  async getMyClaims(
    @CurrentUser() user: any,
  ) {
    return this.claimsService.findByPerson(user.personId);
  }

  @Get('open')
  @Roles(Role.ADMIN, Role.GUARD)
  async getOpenClaims() {
    return this.claimsService.findOpenClaims();
  }

  @Get(':id')
  async getClaim(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.claimsService.findOne(id, user);
  }

  @Patch(':id')
  async updateClaim(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateClaimDto,
  ) {
    return this.claimsService.update(id, dto, user);
  }

  @Patch(':id/close')
  @Roles(Role.ADMIN, Role.GUARD)
  async closeClaim(
    @Param('id') id: string,
    @Body() dto: CloseClaimDto,
  ) {
    return this.claimsService.close(id, dto);
  }

  @Post(':id/comments')
  async addComment(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: CreateClaimCommentDto,
  ) {
    return this.claimsService.addComment(id, dto, user);
  }
}
