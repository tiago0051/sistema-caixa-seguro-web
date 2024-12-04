"use server";

import {
  createProductDB,
  createProductStorageDB,
  getProductDB,
  getProductListCountDB,
  getProductsListDB,
  getProductStoragesListDB,
} from "../db/product";

interface CreateProductProps {
  companyId: string;
  costPrice: number;
  name: string;
  salePrice: number;
  supplierId: string;
}

export async function createProduct({
  companyId,
  costPrice,
  name,
  salePrice,
  supplierId,
}: CreateProductProps) {
  const product = await createProductDB({
    companyId,
    costPrice,
    name,
    salePrice,
    supplierId,
  });

  return product;
}

interface CreateProductStorageProps {
  productId: string;
  storageId: string;
  quantity: number;
}

export async function createProductStorage({
  productId,
  quantity,
  storageId,
}: CreateProductStorageProps) {
  const productStoragesList = await getProductStoragesList({ productId });

  const productStorageExists = productStoragesList.some(
    (productStorage) => productStorage.storageId === storageId
  );

  if (productStorageExists)
    throw new Error("Esse CD já está vinculádo ao produto");

  await createProductStorageDB({ productId, storageId, quantity });
}

export async function getProduct(productId: string) {
  const product = await getProductDB(productId);

  return product;
}

interface GetProductsListProps {
  companyId: string;
  page?: number;
  searchParams: {
    productCod?: string;
    productName?: string;
    supplierId?: string;
  };
  take?: number;
}

export async function getProductsList({
  companyId,
  page = 0,
  searchParams,
  take = 10,
}: GetProductsListProps) {
  const productsList = await getProductsListDB({
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

interface GetProductStoragesListProps {
  productId: string;
}

export async function getProductStoragesList({
  productId,
}: GetProductStoragesListProps) {
  const productStoragesList = await getProductStoragesListDB({ productId });

  return productStoragesList;
}
