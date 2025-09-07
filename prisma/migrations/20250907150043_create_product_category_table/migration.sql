-- AlterTable
ALTER TABLE "product" ADD COLUMN     "product_group_id" TEXT;

-- CreateTable
CREATE TABLE "product_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_group_id_fkey" FOREIGN KEY ("product_group_id") REFERENCES "product_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
