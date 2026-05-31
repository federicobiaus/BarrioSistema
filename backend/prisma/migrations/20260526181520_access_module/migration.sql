-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('ENTRY', 'EXIT');

-- CreateEnum
CREATE TYPE "VisitorType" AS ENUM ('OWNER', 'VISITOR', 'PROVIDER');

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL,
    "type" "AccessType" NOT NULL,
    "visitorType" "VisitorType" NOT NULL,
    "ownerId" TEXT,
    "hostOwnerId" TEXT,
    "fullName" TEXT NOT NULL,
    "dni" TEXT,
    "plate" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "color" TEXT,
    "reason" TEXT,
    "observations" TEXT,
    "photoUrl" TEXT,
    "enteredById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_hostOwnerId_fkey" FOREIGN KEY ("hostOwnerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_enteredById_fkey" FOREIGN KEY ("enteredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
