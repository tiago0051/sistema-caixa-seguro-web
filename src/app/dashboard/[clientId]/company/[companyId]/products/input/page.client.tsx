"use client";

import { ComboboxCellule } from "@/components/cellules/Combobox";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { InputProduct } from "./types/InputProduct";
import { InputSupplier } from "./types/InputSupplier";
import { useRef, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { createSupplier, getSupplierByTaxId } from "@/services/domain/supplier";
import {
  addProductInStorage,
  createProduct,
  getProduct,
  getProductBySupplierCode,
  saveProduct,
} from "@/services/domain/product";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogSelectProduct } from "./components/DialogSelectProduct/DialogSelectProduct";

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

        form.setValue(
          `products.${product.id}`,
          {
            name: product.description,
            ncm: product.ncm,
            costPrice: product.price,
            salePrice: 0,
            quantity: product.quantity,
            productId: product.productId,
            storageQuantity: product.storageQuantity,
            supplierCode: product.code,
          },
          {
            shouldDirty: true,
          }
        );
      });
    }

    event.target.value = "";
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

  function onSelectProduct(productId: string, product: ProductI) {
    form.setValue(`products.${productId}.name`, product.name);
    if (product.ncm) form.setValue(`products.${productId}.ncm`, product.ncm);
    if (product.supplierCode)
      form.setValue(`products.${productId}.supplierCode`, product.supplierCode);
    form.setValue(`products.${productId}.salePrice`, product.salePrice);
    form.setValue(`products.${productId}.storageQuantity`, product.quantity);
    form.setValue(`products.${productId}.productId`, product.id, {
      shouldDirty: true,
    });
  }

  const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
    let supplierId = data.supplier.supplierId;

    if (!supplierId) {
      const newSupplier = await createSupplier({
        companyId: companyId,
        name: data.supplier.name,
        taxId: data.supplier.taxId.replace(/\D/g, ""),
        description: data.supplier.description,
      });

      supplierId = newSupplier.id;
    }

    const createProductPromises = Object.values(data.products).map(
      async (product) => {
        let productId = product.productId;

        if (!productId) {
          const newProduct = await createProduct({
            companyId: companyId,
            supplierId: supplierId,
            costPrice: product.costPrice,
            salePrice: product.salePrice,
            name: product.name,
            ncm: product.ncm,
            supplierCode: product.supplierCode ?? undefined,
          });

          productId = newProduct.id;
        } else {
          const productExists = await getProduct(productId);
          if (productExists) {
            productExists.name = product.name;
            productExists.ncm = product.ncm;
            productExists.costPrice = product.costPrice;
            productExists.salePrice = product.salePrice;

            await saveProduct(productExists);
          }
        }

        await addProductInStorage({
          productId: productId!,
          storageId: data.storageId,
          quantity: product.quantity,
        });
      }
    );

    await Promise.all(createProductPromises);

    toast({
      title: "Sucesso",
      description: "Entrada de produtos registrada com sucesso.",
    });

    form.reset();
  };

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="grid gap-4 w-full"
        >
          <div className="grid sm:grid-cols-2">
            <FormField
              control={form.control}
              name="storageId"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Selecione o CD</FormLabel>
                  <FormControl>
                    <ComboboxCellule.Root
                      trigger={
                        <ComboboxCellule.Trigger placeholder="Selecione o centro de distribuição">
                          {field.value && (
                            <>
                              {
                                storagesList.find((s) => s.id === field.value)
                                  ?.name
                              }
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
                          onSelect={() => field.onChange(storage.id)}
                          selected={field.value === storage.id}
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

            <CardContent className="overflow-scroll grid">
              {form.getValues("products") && (
                <Table className="min-w-[1200px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>NCM</TableHead>
                      <TableHead>Preço de custo</TableHead>
                      <TableHead>Preço de venda</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Estoque</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {Object.entries(form.getValues("products")).map(
                      ([productId, product]) => (
                        <TableRow key={productId}>
                          <TableCell className="flex gap-2 items-center">
                            {!product.productId && (
                              <FiAlertCircle className="text-primary" />
                            )}
                            <div>
                              <DialogSelectProduct
                                onProductSelect={(product) =>
                                  onSelectProduct(productId, product)
                                }
                                defaultSearchValue={product.name}
                              />
                              <Input
                                {...form.register(`products.${productId}.name`)}
                                className="pl-8"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              {...form.register(`products.${productId}.ncm`)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              {...form.register(
                                `products.${productId}.costPrice`
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`products.${productId}.salePrice`}
                              render={({ field: { onChange, ...field } }) => (
                                <FormItem className="m-0">
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(event) =>
                                        onChange(event.target.valueAsNumber)
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              {...form.register(
                                `products.${productId}.quantity`
                              )}
                            />
                          </TableCell>
                          <TableCell>{product.storageQuantity ?? 0}</TableCell>
                          <TableCell>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                form.unregister(`products.${productId}`)
                              }
                            >
                              <FiX />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div>
            <Button type="submit">Salvar entrada</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
