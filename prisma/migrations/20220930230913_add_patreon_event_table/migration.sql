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
