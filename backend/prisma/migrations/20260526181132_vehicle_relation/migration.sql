-- CreateTable
CREATE TABLE "OwnerVehicle" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnerVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnerVehicle_ownerId_vehicleId_key" ON "OwnerVehicle"("ownerId", "vehicleId");

-- AddForeignKey
ALTER TABLE "OwnerVehicle" ADD CONSTRAINT "OwnerVehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerVehicle" ADD CONSTRAINT "OwnerVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
