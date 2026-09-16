-- AlterTable
ALTER TABLE "GraphicDesign" ADD COLUMN     "category" TEXT DEFAULT 'Promotional Flyers',
ADD COLUMN     "title" TEXT DEFAULT 'Untitled Design';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Web Development';
