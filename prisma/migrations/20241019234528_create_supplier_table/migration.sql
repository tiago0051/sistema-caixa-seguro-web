-- AlterTable
ALTER TABLE "product" ADD COLUMN     "suplier_id" TEXT;

-- CreateTable
CREATE TABLE "supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_suplier_id_fkey" FOREIGN KEY ("suplier_id") REFERENCES "supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
