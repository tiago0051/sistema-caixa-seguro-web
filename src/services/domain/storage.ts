import { getStoragesListCountDB, getStoragesListDB } from "../db/storage";

interface GetStoragesListProps {
  companyId: string;
  page?: number;
  searchParams: {
    storageCod?: string;
    storageName?: string;
  };
  take?: number;
}

export async function getStoragesList({
  companyId,
  page = 0,
  searchParams,
  take = 10,
}: GetStoragesListProps) {
  const storagesList = await getStoragesListDB({
    companyId,
    page,
    searchParams,
    take,
  });
  const storagesListCount = await getStoragesListCountDB({
    companyId,
    searchParams,
  });

  return {
    items: storagesList,
    totalPages: Math.ceil(storagesListCount / take),
  };
}
