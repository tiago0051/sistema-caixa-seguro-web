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
export const DistributionCentersListTableSkeletonOrganism: FC = async () => {
  return (
    <div className="grid gap-4 whitespace-nowrap">
      <Table>
        <TableCaption>Lista de centros de distribuição.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cod.</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Qd. Prod</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {new Array(10).fill({}).map((_v, index) => (
            <TableRow key={index}>
              <TableCell colSpan={3}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
