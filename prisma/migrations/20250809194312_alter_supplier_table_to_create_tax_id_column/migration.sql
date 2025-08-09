/*
  Warnings:

  - A unique constraint covering the columns `[taxId]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "supplier" ADD COLUMN     "taxId" VARCHAR(14);

-- CreateIndex
CREATE UNIQUE INDEX "supplier_taxId_key" ON "supplier"("taxId");
