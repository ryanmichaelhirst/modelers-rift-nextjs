/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Asset_path_key" ON "Asset"("path");
