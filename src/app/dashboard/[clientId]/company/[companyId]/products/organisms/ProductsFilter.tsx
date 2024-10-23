"use client";

import { ComboboxCellule } from "@/components/cellules/Combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDebounceCallback } from "usehooks-ts";

interface ProductsFilterOrganismProps {
  suppliersList: SupplierI[];
}

export const ProductsFilterOrganism: FC<ProductsFilterOrganismProps> = ({
  suppliersList,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productCod, setProductCod] = useState("");
  const [productName, setProductName] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const supplierSelected = suppliersList.find(
    (supplier) => supplier.id === supplierId
  );

  function filtrarLista() {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.delete("productCod");
    urlSearchParams.delete("productName");
    urlSearchParams.delete("supplierId");
    urlSearchParams.delete("page");

    if (productCod) urlSearchParams.append("productCod", productCod);
    if (productName) urlSearchParams.append("productName", productName);
    if (supplierId) urlSearchParams.append("supplierId", supplierId);

    router.push(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
  }

  const filtrarListaDebounced = useDebounceCallback(filtrarLista, 500);

  useEffect(() => {
    filtrarListaDebounced();

    return () => filtrarListaDebounced.cancel();
  }, [productCod, productName, supplierId]);

  return (
    <div className="md:border-r border-separate md:mr-4 grid gap-6 md:pr-4 mb-8 md:mb-0">
      <h3 className="font-semibold">Pesquise pelo produto</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input
            onChange={(event) => setProductCod(event.currentTarget.value)}
            value={productCod}
          />
        </div>
        <div className="grid gap-2">
          <Label>Nome do produto</Label>
          <Input
            onChange={(event) => setProductName(event.currentTarget.value)}
            value={productName}
          />
        </div>
        <div className="grid gap-2">
          <Label>Fabricante</Label>

          <ComboboxCellule.Root
            trigger={
              <ComboboxCellule.Trigger placeholder="Selecione o fornecedor">
                {supplierSelected && (
                  <>
                    {supplierSelected.name}
                    <FiX className="text-xl text-red-500" />
                  </>
                )}
              </ComboboxCellule.Trigger>
            }
            searchEmpty="Fornecedor não encontrado"
            searchPlaceholder="Pesquise pelo fornecedor"
            selectClean={() => setSupplierId("")}
          >
            {suppliersList.map((supplier) => (
              <ComboboxCellule.Item
                onSelect={() => setSupplierId(supplier.id)}
                selected={supplierId === supplier.id}
                value={supplier.name}
                key={supplier.id}
              >
                {supplier.name}
              </ComboboxCellule.Item>
            ))}
          </ComboboxCellule.Root>
        </div>
      </div>
    </div>
  );
};
