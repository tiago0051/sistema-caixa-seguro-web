import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../services/prisma";

interface CreateProductDBProps {
  companyId: string;
  costPrice: number;
  name: string;
  salePrice: number;
  supplierId: string;
}

export async function createProductDB({
  companyId,
  costPrice,
  name,
  salePrice,
  supplierId,
}: CreateProductDBProps) {
  const productDB = await prisma.product.create({
    data: {
      costPrice,
      name,
      salePrice,
      company: {
        connect: {
          id: companyId,
        },
      },
      supplier: {
        connect: {
          id: supplierId,
        },
      },
    },
    select: {
      costPrice: true,
      id: true,
      name: true,
      salePrice: true,
      supplier: true,
      productStorages: {
        select: {
          quantity: true,
        },
      },
    },
  });

  return productMap(productDB);
}

export async function getProductDB(productId: string) {
  const productDB = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      costPrice: true,
      id: true,
      name: true,
      salePrice: true,
      supplier: true,
      productStorages: {
        select: {
          quantity: true,
        },
      },
    },
  });

  return productDB && productMap(productDB);
}

export async function getProductsListDB({
  companyId,
  page = 0,
  searchParams,
  take = 10,
}: {
  companyId: string;
  page?: number;
  searchParams: {
    productCod?: string;
    productName?: string;
    supplierId?: string;
  };
  take?: number;
}) {
  const productsListDB = await prisma.product.findMany({
    take,
    skip: page * take,
    orderBy: {
      name: "asc",
    },
    where: {
      AND: [
        { companyId },
        {
          AND: [
            {
              id: {
                startsWith: searchParams.productCod,
              },
            },
            {
              name: {
                contains: searchParams.productName,
                mode: "insensitive",
              },
            },
            {
              supplier: searchParams.supplierId
                ? {
                    id: searchParams.supplierId,
                  }
                : undefined,
            },
          ],
        },
      ],
    },
    select: {
      costPrice: true,
      id: true,
      name: true,
      salePrice: true,
      supplier: true,
      productStorages: {
        select: {
          quantity: true,
        },
      },
    },
  });

  return productsListDB.map((productDB) => productMap(productDB));
}

export async function getProductListCountDB({
  companyId,
  searchParams,
}: {
  companyId: string;
  searchParams: {
    productCod?: string;
    productName?: string;
    supplierId?: string;
  };
}) {
  const productsListCountDB = await prisma.product.count({
    where: {
      AND: [
        { companyId },
        {
          AND: [
            {
              id: {
                startsWith: searchParams.productCod,
              },
            },
            {
              name: {
                contains: searchParams.productName,
                mode: "insensitive",
              },
            },
            {
              supplier: searchParams.supplierId
                ? {
                    id: searchParams.supplierId,
                  }
                : undefined,
            },
          ],
        },
      ],
    },
  });

  return productsListCountDB;
}

function productMap(productDB: {
  costPrice: Decimal;
  id: string;
  name: string;
  salePrice: Decimal;
  supplier: {
    id: string;
    name: string;
  } | null;
  productStorages: { quantity: number }[];
}) {
  return {
    costPrice: productDB.costPrice.toNumber(),
    id: productDB.id,
    name: productDB.name,
    salePrice: productDB.salePrice.toNumber(),
    supplierName: productDB.supplier?.name ?? null,
    quantity: productDB.productStorages
      .map((productStorage) => productStorage.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
  };
}
