import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('stats')
  stats() {
    return this.dashboardService.getStats();
  }

  @Get('latest-accesses')
  latestAccesses() {
    return this.dashboardService.latestAccesses();
  }

  @Get('inside')
  inside() {
    return this.dashboardService.peopleInside();
  }
}