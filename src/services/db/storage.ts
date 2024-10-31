import prisma from "../services/prisma";

interface GetStoragesListDBProps {
  companyId: string;
  page: number;
  searchParams: {
    storageCod?: string;
    storageName?: string;
  };
  take: number;
}

export async function getStoragesListDB({
  companyId,
  searchParams,
  page,
  take,
}: GetStoragesListDBProps) {
  const storagesListDB = await prisma.storage.findMany({
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
                startsWith: searchParams.storageCod,
              },
            },
            {
              name: {
                contains: searchParams.storageName,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    select: {
      createdAt: true,
      id: true,
      name: true,
      _count: {
        select: {
          productStorages: true,
        },
      },
      updatedAt: true,
    },
  });

  return storagesListDB.map((storageDB) => storageMap(storageDB));
}

interface GetStoragesListCountDBProps {
  companyId: string;
  searchParams: {
    storageCod?: string;
    storageName?: string;
  };
}

export async function getStoragesListCountDB({
  companyId,
  searchParams,
}: GetStoragesListCountDBProps) {
  const storagesListCountDB = await prisma.storage.count({
    where: {
      AND: [
        { companyId },
        {
          AND: [
            {
              id: {
                startsWith: searchParams.storageCod,
              },
            },
            {
              name: {
                contains: searchParams.storageName,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
  });

  return storagesListCountDB;
}

interface StorageMapProps {
  createdAt: Date;
  id: string;
  name: string;
  _count: { productStorages: number };
  updatedAt: Date;
}

function storageMap({
  _count,
  createdAt,
  id,
  name,
  updatedAt,
}: StorageMapProps) {
  return {
    id,
    name,
    productsCount: _count.productStorages,
    createdAt,
    updatedAt,
  };
}
