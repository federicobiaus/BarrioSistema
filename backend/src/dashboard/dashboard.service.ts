import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getStats() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [
      peopleInside,
      entriesToday,
      exitsToday,
      blockedPeople,
      owners,
      visitorsToday,
      providers,
      reservationsPending,
      claimsOpen,
      users,
      guards,
    ] = await Promise.all([
      this.prisma.person.count({
        where: {
          isInside: true,
        },
      }),

      this.prisma.accessLog.count({
        where: {
          type: 'ENTRY',
          createdAt: {
            gte: today,
          },
        },
      }),

      this.prisma.accessLog.count({
        where: {
          type: 'EXIT',
          createdAt: {
            gte: today,
          },
        },
      }),

      this.prisma.person.count({
        where: {
          isBlocked: true,
        },
      }),

      this.prisma.person.count({
        where: {
          type: 'OWNER',
        },
      }),

      this.prisma.person.count({
        where: {
          type: 'VISITOR',
          accessLogs: {
            some: {
              createdAt: {
                gte: today,
              },
            },
          },
        },
      }),

      this.prisma.person.count({
        where: {
          type: 'PROVIDER',
        },
      }),

      this.prisma.reservation.count({
        where: {
          status: 'PENDING',
        },
      }),

      this.prisma.claim.count({
        where: {
          status: 'OPEN',
        },
      }),

      this.prisma.user.count(),

      this.prisma.user.count({
        where: {
          role: 'GUARD',
        },
      }),
    ]);

    return {
      peopleInside,
      entriesToday,
      exitsToday,

      blockedPeople,

      owners,
      visitorsToday,
      providers,

      reservationsPending,
      claimsOpen,

      users,
      guards,
    };
  }

  async latestAccesses() {
    return this.prisma.accessLog.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        person: true,
        vehicle: true,
        registeredBy: true,
      },
    });
  }

  async peopleInside() {
    return this.prisma.person.findMany({
      where: {
        isInside: true,
      },
      include: {
        vehicles: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}