/*
  Warnings:

  - Added the required column `language` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'KR');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "summary" TEXT;
