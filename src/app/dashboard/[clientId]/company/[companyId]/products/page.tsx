import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { ProductsListTableOrganism } from "./organisms/ProductsListTable";
import { ProductsListTableSkeletonOrganism } from "./organisms/ProductsListTableSkeleton";
import { ProductsFilterOrganism } from "./organisms/ProductsFilter";

type SearchParams = Promise<Record<string, string>>;

interface ProductsPageProps {
  params: {
    clientId: string;
    companyId: string;
  };
  searchParams: SearchParams;
}

export default async function ProductsPage({
  params,
  searchParams,
}: Readonly<ProductsPageProps>) {
  const { clientId, companyId } = await params;
  const searchParamsStorage = await searchParams;

  return (
    <div className="grid gap-8">
      <div className="md:flex-row justify-between flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Produtos
        </h1>
        <div>
          <Link href={`/dashboard/${clientId}/company/${companyId}/products/0`}>
            <Button>Adicionar produto</Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-[350px_auto] items-start">
        <ProductsFilterOrganism />

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
