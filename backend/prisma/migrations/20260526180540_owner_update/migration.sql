/*
  Warnings:

  - Added the required column `relationshipType` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "blockReason" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "relationshipType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
