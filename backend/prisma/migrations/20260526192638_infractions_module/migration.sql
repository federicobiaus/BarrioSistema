-- CreateEnum
CREATE TYPE "InfractionType" AS ENUM ('SPEED', 'BEHAVIOR', 'DAMAGES', 'OTHER');

-- CreateEnum
CREATE TYPE "InfractionSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "InfractionStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "InfractionTargetType" AS ENUM ('OWNER', 'VISITOR', 'PROVIDER');

-- CreateTable
CREATE TABLE "Infraction" (
    "id" TEXT NOT NULL,
    "type" "InfractionType" NOT NULL,
    "severity" "InfractionSeverity" NOT NULL,
    "status" "InfractionStatus" NOT NULL DEFAULT 'OPEN',
    "targetType" "InfractionTargetType" NOT NULL,
    "details" TEXT NOT NULL,
    "fineAmount" DOUBLE PRECISION,
    "imageUrl" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "ownerId" TEXT,
    "accessBlocked" BOOLEAN NOT NULL DEFAULT false,
    "reservationBlocked" BOOLEAN NOT NULL DEFAULT false,
    "claimsBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Infraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Infraction" ADD CONSTRAINT "Infraction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infraction" ADD CONSTRAINT "Infraction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
