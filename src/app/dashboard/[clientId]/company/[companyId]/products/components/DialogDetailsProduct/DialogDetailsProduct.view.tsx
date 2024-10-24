"use client";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComboboxCellule } from "@/components/cellules/Combobox";
import { DialogDetailsProductService } from "./DialogDetailsProduct.service";
import { DialogDetailsProductViewProps } from "./DialogDetailsProduct.interface";

export function DialogDetailsProductView({
  product,
  suppliersList,
}: DialogDetailsProductViewProps) {
  const { form, isEditing, isLoading, isOpen, onSubmit, onChangeIsOpen } =
    DialogDetailsProductService();

  return (
    <Dialog onOpenChange={(state) => onChangeIsOpen(state)} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant={"link"}>Detalhes</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes Produto</DialogTitle>
          <DialogDescription>
            Informações completas do produto
          </DialogDescription>
        </DialogHeader>

        <section className="space-y-1">
          <div className="flex justify-between">
            <p className="text-lg font-bold">Nome:</p>
            <p>{product.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-bold">Fabricante:</p>
            <p>{product.supplierName}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-bold">Preço custo:</p>
            <p>
              {product.costPrice.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-bold">Preço venda:</p>
            <p>
              {product.salePrice.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
