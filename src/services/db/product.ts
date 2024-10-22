import { Decimal } from "@prisma/client/runtime/library";
import { dbClient } from "./prismaClient";

export async function createProductDB(
  companyId: string,
  costPrice: number,
  name: string,
  salePrice: number
) {
  const productDB = await dbClient.product.create({
    data: {
      costPrice,
      name,
      salePrice,
      company: {
        connect: {
          id: companyId,
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

export async function getProductListDB({
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
    supplierName?: string;
  };
  take?: number;
}) {
  const productsListDB = await dbClient.product.findMany({
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
              supplier: searchParams.supplierName
                ? {
                    name: {
                      contains: searchParams.supplierName,
                      mode: "insensitive",
                    },
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
    supplierName?: string;
  };
}) {
  const productsListCountDB = await dbClient.product.count({
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
              supplier: searchParams.supplierName
                ? {
                    name: {
                      contains: searchParams.supplierName,
                      mode: "insensitive",
                    },
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
