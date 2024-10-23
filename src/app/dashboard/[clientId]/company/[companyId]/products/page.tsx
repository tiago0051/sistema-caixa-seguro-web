import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { ProductsListTableOrganism } from "./organisms/ProductsListTable";
import { ProductsListTableSkeletonOrganism } from "./organisms/ProductsListTableSkeleton";
import { ProductsFilterOrganism } from "./organisms/ProductsFilter";

interface ProductsPageProps {
  params: {
    clientId: string;
    companyId: string;
  };
  searchParams: Record<string, string>;
}

export default function ProductsPage({
  params,
  searchParams,
}: Readonly<ProductsPageProps>) {
  return (
    <div className="grid gap-8">
      <div className="md:flex-row justify-between flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Produtos
        </h1>
        <div>
          <Link
            href={`/dashboard/${params.clientId}/company/${params.companyId}/products/0`}
          >
            <Button>Adicionar produto</Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-[350px_auto] items-start">
        <ProductsFilterOrganism />

        <Suspense
          key={new URLSearchParams(searchParams).toString()}
          fallback={<ProductsListTableSkeletonOrganism />}
        >
          <ProductsListTableOrganism
            params={params}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}
