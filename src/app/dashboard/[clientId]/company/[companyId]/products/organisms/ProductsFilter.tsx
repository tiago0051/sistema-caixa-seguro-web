"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createQueryString } from "@/hooks/searchParamsHook";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC } from "react";

export const ProductsFilter: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productCod = searchParams.get("productCod") || "";
  const productName = searchParams.get("productName") || "";
  const supplierName = searchParams.get("supplierName") || "";

  function handleChangeProductId(event: ChangeEvent<HTMLInputElement>) {
    const searchParamsQuery = createQueryString(
      "productCod",
      event.currentTarget.value,
      searchParams
    );

    searchParamsQuery.delete("page");

    router.push(`${pathname}?${searchParamsQuery.toString()}`);
  }

  function handleProductName(event: ChangeEvent<HTMLInputElement>) {
    const searchParamsQuery = createQueryString(
      "productName",
      event.currentTarget.value,
      searchParams
    );

    searchParamsQuery.delete("page");

    router.push(`${pathname}?${searchParamsQuery.toString()}`);
  }

  function handleSupplierName(event: ChangeEvent<HTMLInputElement>) {
    const searchParamsQuery = createQueryString(
      "supplierName",
      event.currentTarget.value,
      searchParams
    );

    searchParamsQuery.delete("page");

    router.push(`${pathname}?${searchParamsQuery.toString()}`);
  }

  return (
    <div className="md:border-r border-separate md:mr-4 grid gap-6 md:pr-4 mb-8 md:mb-0">
      <h3 className="font-semibold">Pesquise pelo produto</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input
            value={productCod}
            onChange={(event) => handleChangeProductId(event)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Nome do produto</Label>
          <Input
            value={productName}
            onChange={(event) => handleProductName(event)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Nome do fabricante</Label>
          <Input
            value={supplierName}
            onChange={(event) => handleSupplierName(event)}
          />
        </div>
      </div>
    </div>
  );
};
