"use server";

import { createProductDB, getProductListDB } from "../db/product";

export async function createProduct(
  companyId: string,
  costPrice: number,
  name: string,
  salePrice: number
) {
  const product = await createProductDB(companyId, costPrice, name, salePrice);

  return product;
}

export async function getProductList(companyId: string) {
  const productsList = await getProductListDB(companyId);

  return productsList;
}
