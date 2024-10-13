import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export function AccountsListTableBodySkeleton() {
  return (
    <TableBody>
      {new Array(5).fill({}).map((_v, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="w-full h-5" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-5" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-5" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
