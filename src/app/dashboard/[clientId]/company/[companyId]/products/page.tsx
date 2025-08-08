import { Suspense } from "react";
import { ProductsListTableOrganism } from "./organisms/ProductsListTable";
import { ProductsListTableSkeletonOrganism } from "./organisms/ProductsListTableSkeleton";
import { ProductsFilterOrganism } from "./organisms/ProductsFilter";
import { HeaderOrganism } from "@/components/organisms/Header";
import { getSuppliersList } from "@/services/domain/supplier";
import { DialogCreateProduct } from "./components/DialogCreateProduct/DialogCreateProduct";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SearchParams = Promise<Record<string, string>>;

interface ProductsPageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function ProductsPage({
  params,
  searchParams,
}: Readonly<ProductsPageProps>) {
  const { clientId, companyId } = await params;
  const searchParamsStorage = await searchParams;

  const suppliersList = await getSuppliersList({ companyId });

  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Produtos"}>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/${clientId}/company/${companyId}/products/import`}
          >
            <Button variant={"outline"}>Importar</Button>
          </Link>
          <DialogCreateProduct companyId={companyId} />
        </div>
      </HeaderOrganism>

      <div className="grid md:grid-cols-[350px_auto] items-start">
        <ProductsFilterOrganism suppliersList={suppliersList} />

        <Suspense
          key={new URLSearchParams(searchParamsStorage).toString()}
          fallback={<ProductsListTableSkeletonOrganism />}
        >
          <ProductsListTableOrganism
            params={{ clientId, companyId }}
            searchParams={searchParamsStorage}
          />
        </Suspense>
      </div>
    </div>
  );
}
