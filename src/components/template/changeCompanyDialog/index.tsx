"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cnpjFormat } from "@/utils/stringFormat";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const empresas = [
  {
    id: "55c0cbb5-5937-45a7-9242-d43535045bb0",
    socialReason: "Moveis e Colchões Papucaia LTDA",
    fantasyName: "Móveis Papucaia",
    cnpj: "44609750000130",
  },
];

export function ChangeCompanyDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showChangeCompanyDialog =
    searchParams.get("showChangeCompanyDialog") === "true";

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return showChangeCompanyDialog && isMounted ? (
    <Dialog
      defaultOpen
      onOpenChange={(state) => !state && router.push(location.pathname)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Seleciona a empresa na qual deseja interagir
          </DialogTitle>
          <DialogDescription>
            Caso você possui acesso a mais de uma empresa, é possível fazer a
            seleção aqui
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8">
          <div className="grid gap-2">
            <Label htmlFor="busca empresa">Busque pela empresa</Label>
            <Input
              name="busca empresa"
              placeholder="Razão social, CNPJ, ou nome fantasia"
            />
          </div>
          <div className="grid border border-separate rounded-sm">
            {empresas.map((e) => (
              <div
                key={e.id}
                className="flex flex-col md:flex-row md:justify-between py-4 px-2"
              >
                <p>{e.fantasyName || e.socialReason}</p>
                <p>{cnpjFormat(e.cnpj)}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <></>
  );
}
