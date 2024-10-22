import { PaginationOrganism } from "@/components/organisms/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductList } from "@/services/domain/product";
import { FC } from "react";

interface ProductsListTableProps {
  params: {
    clientId: string;
    companyId: string;
  };
  searchParams: Record<string, string>;
}

export const ProductsListTableOrganism: FC<ProductsListTableProps> = async ({
  params,
  searchParams,
}) => {
  const productsList = await getProductList({
    companyId: params.companyId,
    searchParams,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  const { totalPages, items } = productsList;

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
          {items.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                #{product.id.split("-")[0]}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.supplierName}</TableCell>
              <TableCell className="text-right">
                {product.salePrice.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="text-right">{product.quantity}</TableCell>
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
};
