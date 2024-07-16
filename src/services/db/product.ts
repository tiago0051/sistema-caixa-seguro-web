import { dbClient } from "./prismaClient";

export async function getProductList(companyId: string) {
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

  return productsListDB.map((productDB) => ({
    costPrice: productDB.costPrice,
    id: productDB.id,
    name: productDB.name,
    salePrice: productDB.salePrice,
    quantity: productDB.productStorages
      .map((productStorage) => productStorage.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
  }));
}
