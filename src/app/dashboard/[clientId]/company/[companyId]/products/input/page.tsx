import { HeaderOrganism } from "@/components/organisms/Header";
import { getStoragesList } from "@/services/domain/storage";
import InputProductPageClient from "./page.client";

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
  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Entrada de produtos"} />

      <InputProductPageClient
        storagesList={storagesList}
        companyId={companyId}
      />
    </div>
  );
}
