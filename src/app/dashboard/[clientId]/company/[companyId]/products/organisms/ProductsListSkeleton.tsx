import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";
export const ProductsListTableSkeletonOrganism: FC = async () => {
  return (
    <div className="grid gap-4 whitespace-nowrap">
      <Table>
        <TableCaption>Lista de produtos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">Cod.</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead className="text-right">Valor venda</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
