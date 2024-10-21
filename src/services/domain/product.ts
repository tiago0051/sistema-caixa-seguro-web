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

export async function getProductList({
  companyId,
  page = 0,
  take = 10,
}: {
  companyId: string;
  page?: number;
  take?: number;
}) {
  const productsList = await getProductListDB(companyId, take, page);

  return productsList;
}
