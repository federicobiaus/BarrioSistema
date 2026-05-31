import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AccessModule } from './access/access.module';
import { UploadsModule } from './uploads/uploads.module';
import { ClaimsModule } from './claims/claims.module';
import { ReservationsModule } from './reservations/reservations.module';
import { InfractionsModule } from './infractions/infractions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PeopleModule } from './people/people.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    AccessModule,
    UploadsModule,
    ClaimsModule,
    ReservationsModule,
    InfractionsModule,
    DashboardModule,
    PeopleModule,
  ],
})
export class AppModule {}