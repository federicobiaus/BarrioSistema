import { Module } from '@nestjs/common';
import { InfractionsService } from './infractions.service';
import { InfractionsController } from './infractions.controller';

@Module({
  providers: [InfractionsService],
  controllers: [InfractionsController]
})
export class InfractionsModule {}
