/*
  Warnings:

  - Made the column `draftId` on table `DraftVersion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DraftVersion" DROP CONSTRAINT "DraftVersion_draftId_fkey";

-- AlterTable
ALTER TABLE "DraftVersion" ALTER COLUMN "draftId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DraftVersion" ADD CONSTRAINT "DraftVersion_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "Draft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
