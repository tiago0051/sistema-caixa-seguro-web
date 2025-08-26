/*
  Warnings:

  - Added the required column `description` to the `supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supplier" ADD COLUMN     "description" TEXT NOT NULL;
