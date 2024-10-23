"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export const ProductsFilterOrganism: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productCod, setProductCod] = useState("");
  const [productName, setProductName] = useState("");
  const [supplierName, setSupplierName] = useState("");

  function filtrarLista() {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.delete("productCod");
    urlSearchParams.delete("productName");
    urlSearchParams.delete("supplierName");
    urlSearchParams.delete("page");

    if (productCod) urlSearchParams.append("productCod", productCod);
    if (productName) urlSearchParams.append("productName", productName);
    if (supplierName) urlSearchParams.append("supplierName", supplierName);

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  const filtrarListaDebounced = useDebounceCallback(filtrarLista, 500);

  useEffect(() => {
    filtrarListaDebounced();

    return () => filtrarListaDebounced.cancel();
  }, [productCod, productName, supplierName]);

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
          <Label>Nome do fabricante</Label>
          <Input
            onChange={(event) => setSupplierName(event.currentTarget.value)}
            value={supplierName}
          />
        </div>
      </div>
    </div>
  );
};
