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

export async function getProductListDB(
  companyId: string,
  take: number,
  page: number
) {
  const productsListDB = await dbClient.product.findMany({
    take,
    skip: page * take,
    orderBy: {
      name: "asc",
    },
    where: {
      companyId,
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
