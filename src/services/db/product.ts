import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../services/prisma";
import { ProductQuery } from "./query/ProductQuery";

interface CreateProductDBProps {
  companyId: string;
  costPrice: number;
  name: string;
  salePrice: number;
  supplierId: string;
  supplierCode?: string;
  ncm?: string;
}

export async function createProductDB({
  companyId,
  costPrice,
  name,
  salePrice,
  supplierId,
  supplierCode,
  ncm,
}: CreateProductDBProps) {
  const productDB = await prisma.product.create({
    data: {
      ncm,
      supplierCode,
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
    select: ProductQuery,
  });

  return productMap(productDB);
}

interface CreateProductStorageProps {
  storageId: string;
  productId: string;
  quantity: number;
}

export async function createProductStorageDB({
  productId,
  storageId,
  quantity,
}: CreateProductStorageProps) {
  await prisma.productStorage.create({
    data: {
      quantity,
      productId,
      storageId,
    },
  });
}

export async function getProductDB(productId: string) {
  const productDB = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: ProductQuery,
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
    select: ProductQuery,
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

interface GetProductCDListProps {
  productId: string;
}

export async function getProductStoragesListDB({
  productId,
}: GetProductCDListProps) {
  const productCDListDB = await prisma.productStorage.findMany({
    where: {
      productId,
    },
    select: {
      createdAt: true,
      quantity: true,
      storageId: true,
      storage: {
        select: {
          name: true,
        },
      },
      updatedAt: true,
    },
  });

  return productCDListDB.map((productCDDB) => productStorageMap(productCDDB));
}

export async function getProductBySupplierCodeDB(
  supplierCode: string,
  supplierId: string
) {
  const productDB = await prisma.product.findFirst({
    where: {
      supplierCode,
      supplierId,
    },
    select: ProductQuery,
  });

  return productDB && productMap(productDB);
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

interface ProductStorageMapProps {
  createdAt: Date;
  quantity: number;
  storageId: string;
  storage: {
    name: string;
  };
  updatedAt: Date;
}

function productStorageMap({
  createdAt,
  quantity,
  storageId,
  storage,
  updatedAt,
}: ProductStorageMapProps) {
  return {
    createdAt,
    quantity,
    storageId,
    storageName: storage.name,
    updatedAt,
  };
}
