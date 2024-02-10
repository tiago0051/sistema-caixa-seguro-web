"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface ProductsSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductsSearch({ isOpen, onClose }: ProductsSearchProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(state) => !state && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Busca de produtos</DialogTitle>
          <DialogDescription>
            Busque o produto que deseja selecionar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8">
          <div className="grid gap-4 grid-cols-2">
            <div className="grid gap-2">
              <Label>Código</Label>
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
            <Button className="self-end">Filtrar</Button>
          </div>
          <Table className="whitespace-nowrap">
            <TableCaption>Lista de produtos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Cod.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Fabricante</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {new Array(5).fill({}).map((v, index) => (
                <TableRow key={index}>
                  <TableCell>C4AD12</TableCell>
                  <TableCell>Roupeiro Madri</TableCell>
                  <TableCell>Panan</TableCell>
                  <TableCell className="text-right">R$ 700</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
