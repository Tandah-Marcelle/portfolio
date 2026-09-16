-- AlterTable
ALTER TABLE "AboutInfo" ADD COLUMN     "badgeText" TEXT,
ADD COLUMN     "interpretText" TEXT,
ADD COLUMN     "interpretTitle" TEXT,
ADD COLUMN     "motionBadge" TEXT,
ADD COLUMN     "motionKicker" TEXT,
ADD COLUMN     "motionTitle" TEXT,
ADD COLUMN     "pillars" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "quote" TEXT,
ADD COLUMN     "titleAccent" TEXT,
ADD COLUMN     "titlePrefix" TEXT;

-- AlterTable
ALTER TABLE "HeroInfo" ADD COLUMN     "chipOne" TEXT,
ADD COLUMN     "chipTwo" TEXT,
ADD COLUMN     "cvPath2" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "roleBadge" TEXT,
ADD COLUMN     "streamHint" TEXT,
ADD COLUMN     "streamTitle" TEXT;
