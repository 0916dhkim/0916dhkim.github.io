/*
  Warnings:

  - Added the required column `language` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "summary" TEXT;
