import { getStoragesList } from "@/services/domain/storage";
import { ImportProductsPageClient } from "./page.client";

interface ProductsPageProps {
  params: Params;
}

export default async function ImportProductsPage({
  params,
}: ProductsPageProps) {
  const { companyId } = await params;

  const { items: storagesList } = await getStoragesList({
    companyId,
    take: null,
    searchParams: {},
  });

  return <ImportProductsPageClient storagesList={storagesList} />;
}
