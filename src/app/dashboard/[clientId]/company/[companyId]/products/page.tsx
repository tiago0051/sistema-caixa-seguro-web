import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface ProductsPageProps {
  params: {
    clientId: string;
    companyId: string;
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const productsList = await getProductList({
    companyId: params.companyId,
  });

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
      <div className="grid grid-cols-[350px_auto]">
        <div className="border-r border-separate mr-4 grid gap-6 pr-4">
          <h3 className="font-semibold">Pesquise pelo produto</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Código</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Código de barras</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Nome do produto</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Nome do fabricante</Label>
              <Input />
            </div>
            <Button>Filtrar</Button>
          </div>
        </div>
        <div>
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
              {productsList.map((product) => (
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
        </div>
      </div>
    </div>
  );
}
