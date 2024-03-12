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
  let products = [
    {
      id: 1,
      name: "Sofá de Couro",
      category: "Móveis",
      price: 1599.99,
      amountPaid: 799.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Cadeira de Jantar",
      category: "Móveis",
      price: 199.99,
      amountPaid: 99.99,
      quantity: 4,
    },
    {
      id: 3,
      name: "Mesa de Centro",
      category: "Móveis",
      price: 299.99,
      amountPaid: 149.99,
      quantity: 1,
    },
    {
      id: 4,
      name: "Estante de Livros",
      category: "Móveis",
      price: 499.99,
      amountPaid: 249.99,
      quantity: 3,
    },
    {
      id: 5,
      name: "Cama King Size",
      category: "Móveis",
      price: 799.99,
      amountPaid: 399.99,
      quantity: 1,
    },
    {
      id: 6,
      name: "Guarda-Roupa Espelhado",
      category: "Móveis",
      price: 1299.99,
      amountPaid: 649.99,
      quantity: 2,
    },
    {
      id: 7,
      name: "Mesa de Escritório",
      category: "Móveis",
      price: 349.99,
      amountPaid: 174.99,
      quantity: 1,
    },
  ];

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
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor venda</TableHead>
                <TableHead className="text-right">Valor custo</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">#{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-right">
                    {p.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {p.amountPaid.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right">{p.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
