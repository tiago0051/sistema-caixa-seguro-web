import { HeaderOrganism } from "@/components/organisms/Header";
import { Suspense } from "react";
import { DistributionCentersListTableOrganism } from "./organisms/DistributionCentersListTable";
import { DistributionCentersListTableSkeletonOrganism } from "./organisms/DistributionCentersListTableSkeleton";
import { DistributionCentersFilterOrganism } from "./organisms/DistributionCentersFilter";
import { DialogCreateDistributionCenter } from "./components/DialogCreateDistributionCenter";

type SearchParams = Promise<Record<string, string>>;

interface DistributionCentersProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function DistributionCenters({
  params,
  searchParams,
}: DistributionCentersProps) {
  const { clientId, companyId } = await params;
  const searchParamsStorage = await searchParams;

  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Centros de distribuição"}>
        <DialogCreateDistributionCenter
          clientId={clientId}
          companyId={companyId}
        />
      </HeaderOrganism>

      <div className="grid md:grid-cols-[350px_auto] items-start">
        <DistributionCentersFilterOrganism />

        <Suspense
          key={new URLSearchParams(searchParamsStorage).toString()}
          fallback={<DistributionCentersListTableSkeletonOrganism />}
        >
          <DistributionCentersListTableOrganism
            params={{ clientId, companyId }}
            searchParams={searchParamsStorage}
          />
        </Suspense>
      </div>
    </div>
  );
}
