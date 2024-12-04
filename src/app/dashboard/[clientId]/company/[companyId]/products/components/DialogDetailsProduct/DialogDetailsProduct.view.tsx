"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDetailsProductService } from "./DialogDetailsProduct.service";
import { DialogDetailsProductViewProps } from "./DialogDetailsProduct.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComboboxCellule } from "@/components/cellules/Combobox";

export function DialogDetailsProductView({
  product,
  productStoragesList,
  storagesList,
}: DialogDetailsProductViewProps) {
  const { changeProductStorageQuantity, isOpen, onChangeIsOpen } =
    DialogDetailsProductService({
      productStoragesList,
    });

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

        <section>
          <div className="space-y-1">
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CD</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {productStoragesList.map((productStorage) => (
                <TableRow key={productStorage.storageId}>
                  <TableCell>{productStorage.storageName}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={productStorage.quantity}
                      onChange={(event) =>
                        changeProductStorageQuantity(
                          productStorage.storageId,
                          event.currentTarget.valueAsNumber
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>
                  <ComboboxCellule.Root
                    searchEmpty="CD não encontrado"
                    searchPlaceholder="Buscar CD"
                    trigger={
                      <ComboboxCellule.Trigger placeholder="">
                        Teste
                      </ComboboxCellule.Trigger>
                    }
                  >
                    {storagesList.map((storage) => (
                      <ComboboxCellule.Item
                        key={storage.id}
                        selected={false}
                        onSelect={() => {}}
                      >
                        {storage.name}
                      </ComboboxCellule.Item>
                    ))}
                  </ComboboxCellule.Root>
                </TableCell>
                <TableCell>
                  <Input type="number" />
                </TableCell>

                <TableCell>
                  <Button variant={"link"}>Adicionar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
        <DialogFooter>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
