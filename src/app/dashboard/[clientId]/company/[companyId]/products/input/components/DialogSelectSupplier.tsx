import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supplierTaxIdFormat } from "@/utils/stringFormat";
import { FC, useState } from "react";
import { FiSearch } from "react-icons/fi";

type DialogSelectSupplierProps = {
  suppliersList: SupplierI[];
  onSupplierSelect: (supplier: SupplierI) => void;
};

export const DialogSelectSupplier: FC<DialogSelectSupplierProps> = ({
  suppliersList,
  onSupplierSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const showedSuppliers = suppliersList
    .filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.taxId?.includes(search.replace(/\D/g, ""))
    )
    .slice(0, 5);

  function selectSupplier(supplier: SupplierI) {
    onSupplierSelect(supplier);
    setOpen(false);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-primary text-lg p-2 absolute">
          <FiSearch />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lista de fornecedores</DialogTitle>
          <DialogDescription>Selecione o fornecedor</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Input
              placeholder="Pesquise pelo fornecedor"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF / CNPJ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showedSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="cursor-pointer"
                  onClick={() => selectSupplier(supplier)}
                >
                  <TableCell>{supplier.description}</TableCell>
                  <TableCell>
                    {supplier.taxId && supplierTaxIdFormat(supplier.taxId)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
