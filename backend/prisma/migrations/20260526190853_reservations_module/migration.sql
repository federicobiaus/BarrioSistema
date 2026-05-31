-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('CLUBHOUSE', 'FOOTBALL', 'VOLLEY');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'FINISHED');

-- CreateEnum
CREATE TYPE "ClubHouseWing" AS ENUM ('EAST', 'WEST');

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "type" "ReservationType" NOT NULL,
    "wing" "ClubHouseWing",
    "notes" TEXT,
    "peopleCount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
