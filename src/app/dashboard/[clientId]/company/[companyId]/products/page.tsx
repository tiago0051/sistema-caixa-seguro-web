import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { ProductsFilter } from "./organisms/ProductsFilter";
import { PaginationOrganism } from "@/components/organisms/Pagination";

interface ProductsPageProps {
  params: {
    clientId: string;
    companyId: string;
  };
  searchParams: Record<string, string>;
}

export default async function ProductsPage({
  params,
  searchParams,
}: Readonly<ProductsPageProps>) {
  const productsList = await getProductList({
    companyId: params.companyId,
    searchParams,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  const { totalPages, items } = productsList;

  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div>
          <Link
            href={`/dashboard/${params.clientId}/company/${params.companyId}/products/0`}
          >
            <Button>Adicionar produto</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[350px_auto] items-start">
        <ProductsFilter />

        <div className="grid gap-4">
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
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationOrganism
            searchParams={searchParams}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
