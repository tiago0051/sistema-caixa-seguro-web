"use server";

import {
  createProductDB,
  getProductListCountDB,
  getProductListDB,
} from "../db/product";

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
  const productsList = await getProductListDB({
    companyId,
    take,
    searchParams,
    page,
  });

  const productsListCount = await getProductListCountDB({
    companyId,
    searchParams,
  });

  return {
    items: productsList,
    totalPages: Math.ceil(productsListCount / take),
  };
}
