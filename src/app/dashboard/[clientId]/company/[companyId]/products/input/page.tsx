import { HeaderOrganism } from "@/components/organisms/Header";
import { getStoragesList } from "@/services/domain/storage";
import InputProductPageClient from "./page.client";
import { getSuppliersList } from "@/services/domain/supplier";

type InputProductPageProps = {
  params: Params;
};

export default async function InputProductPage({
  params,
}: InputProductPageProps) {
  const { companyId } = await params;

  const { items: storagesList } = await getStoragesList({
    companyId,
    take: null,
    searchParams: {},
  });

  const suppliersList = await getSuppliersList({
    companyId,
  });
  return (
    <div className="grid gap-8">
      <InputProductPageClient
        storagesList={storagesList}
        suppliersList={suppliersList}
        companyId={companyId}
      />
    </div>
  );
}
