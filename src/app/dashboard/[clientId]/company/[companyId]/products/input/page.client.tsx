"use client";

import { ComboboxCellule } from "@/components/cellules/Combobox";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { InputProduct } from "./types/InputProduct";
import { InputSupplier } from "./types/InputSupplier";
import { useRef, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { getSupplierByTaxId } from "@/services/domain/supplier";
import { getProductBySupplierCode } from "@/services/domain/product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormSchema, InputFormValues } from "./page.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HeaderOrganism } from "@/components/organisms/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supplierTaxIdFormat } from "@/utils/stringFormat";
import { findSupplierByTaxId } from "./page.action";
import { DialogSelectSupplier } from "./components/DialogSelectSupplier";

type InputProductPageClientProps = {
  storagesList: IStorage[];
  suppliersList: SupplierI[];
  companyId: string;
};

export default function InputProductPageClient({
  storagesList,
  companyId,
  suppliersList,
}: InputProductPageClientProps) {
  const inputFileXmlRef = useRef<HTMLInputElement | null>(null);

  const [isLoadingFindTaxId, startTransitionFindTaxId] = useTransition();

  const form = useForm<InputFormValues>({
    resolver: zodResolver(InputFormSchema),
    defaultValues: {
      supplier: {
        taxId: "",
        description: "",
        name: "",
        supplierId: null,
      },
    },
  });

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

  async function getProductFromXml(element: Element, supplier: InputSupplier) {
    const prod = element.querySelector("prod");

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

    let product: ProductI | null = null;

    if (supplier.supplierId) {
      product = await getProductBySupplierCode(code, supplier.supplierId);
    }

    const newProduct = new InputProduct(
      null,
      product?.id ?? null,
      supplier.id,
      code,
      description,
      ncm,
      price,
      quantity,
      product?.quantity
    );

    return newProduct;
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

      const supplierTaxIdFormatted = supplierTaxIdFormat(supplierXml.taxId);

      form.setValue("supplier.name", supplierXml.name);
      if (supplierTaxIdFormatted)
        form.setValue("supplier.taxId", supplierTaxIdFormatted);
      form.setValue("supplier.supplierId", supplierXml.supplierId);

      products.forEach(async (productElement) => {
        const product = await getProductFromXml(productElement, supplierXml);

        form.setValue(`products.${product.id}`, {
          name: product.description,
          ncm: product.ncm,
          costPrice: product.price,
          salePrice: 0,
          quantity: product.quantity,
          productId: product.productId,
          storageQuantity: product.storageQuantity,
          supplierCode: product.code,
        });
      });
    }
  }

  function selectSupplier(supplier: SupplierI) {
    const supplierTaxIdFormatted = supplierTaxIdFormat(supplier.taxId);

    form.setValue("supplier.name", supplier.name);
    if (supplierTaxIdFormatted)
      form.setValue("supplier.taxId", supplierTaxIdFormatted);
    form.setValue("supplier.supplierId", supplier.id);
    form.setValue("supplier.description", supplier.description);
  }

  async function onTaxIdBlur(event: React.FocusEvent<HTMLInputElement>) {
    const taxId = event.currentTarget.value.replace(/\D/g, "");

    const hasCpf = taxId.length === 11;
    const hasCnpj = taxId.length === 14;

    if (hasCpf || hasCnpj) {
      const supplier = await getSupplierByTaxId({
        companyId,
        taxId,
      });

      if (supplier) {
        form.setValue("supplier.name", supplier.name);
        form.setValue("supplier.supplierId", supplier.id);

        return;
      }

      if (hasCnpj) {
        const supplier = await findSupplierByTaxId(taxId);

        if (supplier?.nome) form.setValue("supplier.name", supplier.nome);
        if (supplier?.fantasia)
          form.setValue("supplier.description", supplier.fantasia);
        form.setValue("supplier.supplierId", null);

        return;
      }
    }
  }

  return (
    <>
      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        ref={inputFileXmlRef}
        className="hidden"
      />

      <HeaderOrganism title={"Entrada de produtos"}>
        <Button
          variant="outline"
          type="button"
          onClick={() => inputFileXmlRef.current?.click()}
        >
          Importar NF
        </Button>
      </HeaderOrganism>

      <Form {...form}>
        <form noValidate className="grid gap-4 w-full">
          <div className="grid sm:grid-cols-2">
            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Selecione o CD</FormLabel>
                  <FormControl>
                    <ComboboxCellule.Root
                      trigger={
                        <ComboboxCellule.Trigger placeholder="Selecione o centro de distribuição">
                          {field.value && (
                            <>
                              {field.value.name}
                              <FiX className="text-xl text-red-500" />
                            </>
                          )}
                        </ComboboxCellule.Trigger>
                      }
                      searchEmpty="Fornecedor não encontrado"
                      searchPlaceholder="Pesquise pelo fornecedor"
                      selectClean={() => field.onChange(null)}
                    >
                      {storagesList.map((storage) => (
                        <ComboboxCellule.Item
                          onSelect={() => field.onChange(storage)}
                          selected={field.value?.id === storage.id}
                          value={storage.name}
                          key={storage.id}
                        >
                          {storage.name}
                        </ComboboxCellule.Item>
                      ))}
                    </ComboboxCellule.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fornecedor</CardTitle>
              <CardDescription>Preencha os dados do fornecedor</CardDescription>
            </CardHeader>

            <CardContent className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier.taxId"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="grid mb-2">
                    <FormLabel>CNPJ / CPF</FormLabel>
                    <FormControl>
                      <div>
                        <DialogSelectSupplier
                          suppliersList={suppliersList}
                          onSupplierSelect={(supplier) =>
                            selectSupplier(supplier)
                          }
                        />
                        <Input
                          {...field}
                          className="pl-8"
                          onChange={(e) =>
                            onChange(supplierTaxIdFormat(e.currentTarget.value))
                          }
                          disabled={isLoadingFindTaxId}
                          onBlur={(event) =>
                            startTransitionFindTaxId(async () =>
                              onTaxIdBlur(event)
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplier.name"
                render={({ field }) => (
                  <FormItem className="grid mb-2">
                    <FormLabel>Razão social</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplier.description"
                render={({ field }) => (
                  <FormItem className="grid mb-2">
                    <FormLabel>Nome fantasia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>Adicione os produtos</CardDescription>
            </CardHeader>

            <CardContent className="grid sm:grid-cols-2 gap-4"></CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
