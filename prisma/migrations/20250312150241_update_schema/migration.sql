/*
  Warnings:

  - You are about to drop the column `author_id` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_author_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "author_id";
