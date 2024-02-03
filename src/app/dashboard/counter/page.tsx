"use client";

import { Button } from "@/components/ui/button";
import { ComboboxCustomers } from "@/components/ui/combobox-customers";
import { ComboboxSellers } from "@/components/ui/combobox-sellers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsSearch } from "./components/productsSearch";
import { useState } from "react";
import { PreSalesList } from "./components/preSalesList";
import { FinalizeSale } from "./components/finalizeSale";

export default function CounterPage() {
  const [isOpenProductsSearch, setIsOpenProductsSearch] = useState(false);
  const [isOpenPreSalesList, setIsOpenPreSalesList] = useState(false);
  const [isOpenFinalizeSale, setIsOpenFinalizeSale] = useState(false);

  return (
    <div className="grid gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Caixa</h1>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" onClick={() => setIsOpenPreSalesList(true)}>
            Listar pré-vendas
          </Button>
          <Button>Salvar pré-venda</Button>
        </div>
      </div>
      <div className="grid grid-cols-[auto_280px] gap-4">
        <div>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Digite o código de barras do produto" />
            <Button onClick={() => setIsOpenProductsSearch(true)}>
              Buscar produto
            </Button>
          </div>
          <Table>
            <TableCaption>Lista de produtos adicionados.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cod.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="text-right">Valor unitário</TableHead>
                <TableHead className="text-right">Valor total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Roupeiro Espanha 2P</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$500.00</TableCell>
                <TableCell className="text-right text-destructive">
                  Remover
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Roupeiro Madri C/Espelho</TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right text-destructive">
                  Remover
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right">$750.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="border-l border-separate pl-4">
          <div className="grid gap-6 w-[200px] mx-auto">
            <h3 className="font-semibold">Informações da venda</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Vendedor</Label>
                <ComboboxSellers />
              </div>
              <div className="grid gap-2">
                <Label>Cliente</Label>
                <ComboboxCustomers />
              </div>
              <div className="grid gap-2">
                <Label>Desconto</Label>
                <div className="flex gap-4">
                  <div className="grid gap-2 relative items-center">
                    <Input type="number" className="pl-8 peer" />
                    <Label className="text-xs absolute left-2 peer-focus:text-primary text-border">
                      %
                    </Label>
                  </div>
                  <div className="grid gap-2 relative items-center ">
                    <Input type="number" className="pl-8 peer" />
                    <Label className="text-xs absolute left-2 peer-focus:text-primary text-border">
                      R$
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <h3 className="font-semibold">Valor a ser pago</h3>
                <h3 className="text-2xl">
                  <span className="text-xs">R$ </span>750.00
                </h3>
              </div>
              <Button onClick={() => setIsOpenFinalizeSale(true)}>
                Finalizar venda
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductsSearch
        isOpen={isOpenProductsSearch}
        onClose={() => setIsOpenProductsSearch(false)}
      />

      <PreSalesList
        isOpen={isOpenPreSalesList}
        onClose={() => setIsOpenPreSalesList(false)}
      />

      <FinalizeSale
        isOpen={isOpenFinalizeSale}
        onClose={() => setIsOpenFinalizeSale(false)}
      />
    </div>
  );
}
