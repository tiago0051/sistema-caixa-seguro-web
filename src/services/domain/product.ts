"use server";

import {
  createProductDB,
  createProductStorageDB,
  getProductBySupplierCodeDB,
  getProductDB,
  getProductListCountDB,
  getProductsListDB,
  getProductStoragesListDB,
  saveProductStorageDB,
} from "../db/product";

interface CreateProductProps {
  companyId: string;
  costPrice: number;
  name: string;
  salePrice: number;
  supplierId: string;
  supplierCode?: string;
  ncm?: string;
}

export async function createProduct({
  companyId,
  costPrice,
  name,
  salePrice,
  supplierId,
  supplierCode,
  ncm,
}: CreateProductProps) {
  const product = await createProductDB({
    companyId,
    costPrice,
    name,
    salePrice,
    supplierId,
    supplierCode,
    ncm,
  });

  return product;
}

interface CreateProductStorageProps {
  productId: string;
  storageId: string;
  quantity: number;
}

export async function addProductInStorage({
  productId,
  quantity,
  storageId,
}: CreateProductStorageProps) {
  const productStoragesList = await getProductStoragesList({ productId });

  const productStorageExists = productStoragesList.find(
    (productStorage) => productStorage.storageId === storageId
  );

  if (productStorageExists) {
    productStorageExists.quantity += quantity;

    await saveProductStorage(productId, productStorageExists);
  } else {
    await createProductStorageDB({ productId, storageId, quantity });
  }
}

export async function getProduct(productId: string) {
  const product = await getProductDB(productId);

  return product;
}

export async function getProductBySupplierCode(
  supplierCode: string,
  supplierId: string
) {
  const product = await getProductBySupplierCodeDB(supplierCode, supplierId);

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

export async function saveProductStorage(
  productId: string,
  productStorage: ProductStorageI
) {
  return saveProductStorageDB(productId, productStorage);
}
