-- DropIndex
DROP INDEX "Asset_url_key";

-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "url" DROP NOT NULL;
