"use client";

import { ComboboxCellule } from "@/components/cellules/Combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDebounceCallback } from "usehooks-ts";

interface DistributionCentersFilterOrganismProps {}

export const DistributionCentersFilterOrganism: FC<
  DistributionCentersFilterOrganismProps
> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productCod, setProductCod] = useState("");
  const [productName, setProductName] = useState("");

  function filtrarLista() {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.delete("productCod");
    urlSearchParams.delete("productName");
    urlSearchParams.delete("page");

    if (productCod) urlSearchParams.append("productCod", productCod);
    if (productName) urlSearchParams.append("productName", productName);

    router.push(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
  }

  const filtrarListaDebounced = useDebounceCallback(filtrarLista, 500);

  useEffect(() => {
    filtrarListaDebounced();

    return () => filtrarListaDebounced.cancel();
  }, [productCod, productName]);

  return (
    <div className="md:border-r border-separate md:mr-4 grid gap-6 md:pr-4 mb-8 md:mb-0">
      <h3 className="font-semibold">Pesquise</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input
            onChange={(event) => setProductCod(event.currentTarget.value)}
            value={productCod}
          />
        </div>
        <div className="grid gap-2">
          <Label>Nome</Label>
          <Input
            onChange={(event) => setProductName(event.currentTarget.value)}
            value={productName}
          />
        </div>
      </div>
    </div>
  );
};
