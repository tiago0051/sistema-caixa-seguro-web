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

  const [storageCod, setStorageCod] = useState("");
  const [storageName, setStorageName] = useState("");

  function filtrarLista() {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.delete("storageCod");
    urlSearchParams.delete("storageName");
    urlSearchParams.delete("page");

    if (storageCod) urlSearchParams.append("storageCod", storageCod);
    if (storageName) urlSearchParams.append("storageName", storageName);

    router.push(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
  }

  const filtrarListaDebounced = useDebounceCallback(filtrarLista, 500);

  useEffect(() => {
    filtrarListaDebounced();

    return () => filtrarListaDebounced.cancel();
  }, [storageCod, storageName]);

  return (
    <div className="md:border-r border-separate md:mr-4 grid gap-6 md:pr-4 mb-8 md:mb-0">
      <h3 className="font-semibold">Pesquise</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input
            onChange={(event) => setStorageCod(event.currentTarget.value)}
            value={storageCod}
          />
        </div>
        <div className="grid gap-2">
          <Label>Nome</Label>
          <Input
            onChange={(event) => setStorageName(event.currentTarget.value)}
            value={storageName}
          />
        </div>
      </div>
    </div>
  );
};
