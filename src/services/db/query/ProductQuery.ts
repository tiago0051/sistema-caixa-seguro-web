import { Prisma } from "@prisma/client";

export const ProductQuery: Prisma.ProductSelect = {
  costPrice: true,
  id: true,
  name: true,
  salePrice: true,
  supplier: true,
  ncm: true,
  supplierCode: true,
  productStorages: {
    select: {
      quantity: true,
    },
  },
};
