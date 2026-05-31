/*
  Warnings:

  - Added the required column `personId` to the `AccessLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('OWNER', 'VISITOR', 'PROVIDER');

-- AlterTable
ALTER TABLE "AccessLog" ADD COLUMN     "personId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "personId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "type" "PersonType" NOT NULL,
    "photoUrl" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isInside" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_dni_key" ON "Person"("dni");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
