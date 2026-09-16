-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "Volunteering" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Volunteering_pkey" PRIMARY KEY ("id")
);
