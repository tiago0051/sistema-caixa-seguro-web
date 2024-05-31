"use client";

import { useState } from "react";
import { ClientIL } from "../page.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CompanyI } from "@/types/company/company";
import { useRouter } from "next/navigation";

export function Form({ clients }: { clients: ClientIL[] }) {
  const router = useRouter();

  const [selectedClient, setSelectedClient] = useState<ClientIL>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyI>();

  return (
    <div className="grid gap-8">
      <fieldset>
        <Label className="block mb-2">Cliente</Label>
        <Select
          onValueChange={(value) =>
            setSelectedClient(clients.find((client) => client.id === value))
          }
          value={selectedClient?.id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
      <fieldset>
        <Label className="block mb-2">Empresa</Label>
        <Select
          disabled={!selectedClient}
          onValueChange={(companyId) =>
            setSelectedCompany(
              selectedClient?.companies.find(
                (company) => company.id === companyId
              )
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma empresa" />
          </SelectTrigger>
          <SelectContent>
            {selectedClient?.companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
      <Button
        disabled={!selectedCompany}
        onClick={() =>
          router.push(
            `/dashboard/${selectedClient?.id}/company/${selectedCompany?.id}/counter`
          )
        }
      >
        Selecionar
      </Button>
    </div>
  );
}
