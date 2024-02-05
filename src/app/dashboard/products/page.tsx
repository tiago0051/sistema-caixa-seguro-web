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
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div>
          <Link href="/dashboard/products/0">
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
                <TableHead>Quantidade</TableHead>
                <TableHead className="text-right">Valor unitário</TableHead>
                <TableHead className="text-right">Valor total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Roupeiro Espanha 2P</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$500.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Roupeiro Madri C/Espelho</TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
