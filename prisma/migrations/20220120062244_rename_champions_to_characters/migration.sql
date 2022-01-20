/*
  Warnings:

  - You are about to drop the column `championId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the `Champion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `characterId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_championId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "championId",
ADD COLUMN     "characterId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Champion";

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
