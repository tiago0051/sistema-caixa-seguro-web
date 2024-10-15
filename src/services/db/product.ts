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
      productStorages: {
        select: {
          quantity: true,
        },
      },
    },
  });

  return productMap(productDB);
}

export async function getProductListDB(companyId: string) {
  const productsListDB = await dbClient.product.findMany({
    where: {
      companyId,
    },
    select: {
      costPrice: true,
      id: true,
      name: true,
      salePrice: true,
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
  costPrice: number;
  id: string;
  name: string;
  salePrice: number;
  productStorages: { quantity: number }[];
}) {
  return {
    costPrice: productDB.costPrice,
    id: productDB.id,
    name: productDB.name,
    salePrice: productDB.salePrice,
    quantity: productDB.productStorages
      .map((productStorage) => productStorage.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
  };
}
