-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "images" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "logoUrl" TEXT;
