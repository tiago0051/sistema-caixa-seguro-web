import { PaginationOrganism } from "@/components/organisms/Pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductsList } from "@/services/domain/product";
import { getStoragesList } from "@/services/domain/storage";

interface DistributionCentersListTableProps {
  params: {
    clientId: string;
    companyId: string;
  };
  searchParams: Record<string, string>;
}

export async function DistributionCentersListTableOrganism({
  params,
  searchParams,
}: DistributionCentersListTableProps) {
  const storagesList = await getStoragesList({
    companyId: params.companyId,
    searchParams,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  const { totalPages, items } = storagesList;

  return (
    <div className="grid gap-4 whitespace-nowrap">
      <Table>
        <TableCaption>Lista de centros de distribuição.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cod.</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Quantidade produtos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((storage) => (
            <TableRow key={storage.id}>
              <TableCell className="font-medium">
                #{storage.id.split("-")[0]}
              </TableCell>
              <TableCell>{storage.name}</TableCell>
              <TableCell className="text-right">
                {storage.productsCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <PaginationOrganism
          searchParams={searchParams}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
