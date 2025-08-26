"use client";

import { ComboboxCellule } from "@/components/cellules/Combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputProduct } from "./types/InputProduct";
import { InputSupplier } from "./types/InputSupplier";
import { useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSupplierByTaxId } from "@/services/domain/supplier";
import { Label } from "@/components/ui/label";
import { SupplierRow } from "./components/SupplierRow";

type InputProductPageClientProps = {
  storagesList: IStorage[];
  companyId: string;
};

export default function InputProductPageClient({
  storagesList,
  companyId,
}: InputProductPageClientProps) {
  const inputFileXmlRef = useRef<HTMLInputElement | null>(null);

  const [storageSelected, setStorageSelected] = useState<IStorage | null>(null);

  const [suppliers, setSuppliers] = useState<InputSupplier[]>([]);
  const [products, setProducts] = useState<InputProduct[]>([]);

  async function readFile(file: File) {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const xmlString = event.target?.result as string;

        resolve(xmlString);
      };
      reader.readAsText(file);
    });
  }

  async function getSupplierFromXml(issuer: Element): Promise<InputSupplier> {
    const supplierName = issuer.querySelector("xNome")?.textContent || "";
    const supplierTaxId = issuer.querySelector("CNPJ")?.textContent || "";

    const supplierExists = await getSupplierByTaxId({
      companyId,
      taxId: supplierTaxId,
    });

    if (supplierExists)
      return new InputSupplier(
        null,
        supplierExists.id,
        supplierExists.name,
        supplierExists.taxId
      );

    return new InputSupplier(null, null, supplierName, supplierTaxId);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const xml = await readFile(file);

      const xmlDom = new DOMParser().parseFromString(xml, "text/xml");

      const products = xmlDom.querySelectorAll("det");
      const issuer = xmlDom.querySelector("emit");

      if (!issuer || !products) {
        toast({
          title: "Erro",
          description: "Não foi possível processar o arquivo XML.",
          variant: "destructive",
        });
        return;
      }

      const supplierXml = await getSupplierFromXml(issuer);

      products.forEach((product) => {
        const prod = product.querySelector("prod");

        const code = prod?.querySelector("cProd")?.textContent || "";
        const description = prod?.querySelector("xProd")?.textContent || "";
        const ncm = prod?.querySelector("NCM")?.textContent || "";
        const price = parseInt(
          prod?.querySelector("vUnCom")?.textContent || "0",
          10
        );
        const quantity = parseInt(
          prod?.querySelector("qCom")?.textContent || "0",
          10
        );

        const newProduct = new InputProduct(
          supplierXml.id,
          code,
          description,
          ncm,
          price,
          quantity
        );

        setSuppliers((prev) => {
          const existingSupplier = prev.find((s) => s.id === supplierXml.id);
          if (!existingSupplier) {
            return [...prev, supplierXml];
          }

          return prev;
        });

        setProducts((prev) => [...prev, newProduct]);
      });
    }
  }

  const hasProducts = products.length > 0;

  return (
    <form noValidate className="grid gap-4 w-full">
      <div className="grid sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Selecione o CD</Label>
          <ComboboxCellule.Root
            trigger={
              <ComboboxCellule.Trigger placeholder="Selecione o centro de distribuição">
                {storageSelected && (
                  <>
                    {storageSelected.name}
                    <FiX className="text-xl text-red-500" />
                  </>
                )}
              </ComboboxCellule.Trigger>
            }
            searchEmpty="Fornecedor não encontrado"
            searchPlaceholder="Pesquise pelo fornecedor"
            selectClean={() => setStorageSelected(null)}
          >
            {storagesList.map((storage) => (
              <ComboboxCellule.Item
                onSelect={() => setStorageSelected(storage)}
                selected={storageSelected?.id === storage.id}
                value={storage.name}
                key={storage.id}
              >
                {storage.name}
              </ComboboxCellule.Item>
            ))}
          </ComboboxCellule.Root>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>
            Adicione os produtos que deseja cadastrar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            ref={inputFileXmlRef}
            className="hidden"
          />
          <div className="gap-2 flex flex-col sm:flex-row">
            <Button variant="outline">Adicionar Produto</Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => inputFileXmlRef.current?.click()}
            >
              Importar NF
            </Button>
          </div>

          <Separator />

          <div>
            {hasProducts &&
              suppliers.map((supplier) => (
                <SupplierRow
                  key={supplier.id}
                  supplier={supplier}
                  products={products.filter(
                    (p) => p.inputSupplierId === supplier.id
                  )}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
