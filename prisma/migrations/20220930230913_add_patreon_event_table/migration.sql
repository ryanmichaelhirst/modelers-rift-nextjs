/*
  Warnings:

  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Donation";

-- CreateTable
CREATE TABLE "PatreonEvent" (
    "id" SERIAL NOT NULL,
    "patronId" TEXT NOT NULL,
    "patronEmail" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PatreonEvent_pkey" PRIMARY KEY ("id")
);
