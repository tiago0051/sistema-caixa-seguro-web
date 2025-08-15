"use client";

import { HeaderOrganism } from "@/components/organisms/Header";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ProductXml } from "./types/ProductXml";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  createProduct,
  getProductBySupplierCode,
} from "@/services/domain/product";
import { SupplierXml } from "./types/SupplierXml";
import { useParams, useRouter } from "next/navigation";
import { cnpjFormat } from "@/utils/stringFormat";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupplier, getSupplierByTaxId } from "@/services/domain/supplier";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { ComboboxCellule } from "@/components/cellules/Combobox";
import { FiX } from "react-icons/fi";

interface ImportProductsPageClientProps {
  storagesList: IStorage[];
}

export function ImportProductsPageClient({
  storagesList,
}: ImportProductsPageClientProps) {
  const { companyId, clientId } = useParams() as {
    clientId: string;
    companyId: string;
  };
  const { toast } = useToast();
  const router = useRouter();

  const [storageSelected, setStorageSelected] = useState<IStorage | null>(null);
  const [products, setProducts] = useState<ProductXml[]>([]);
  const [supplier, setSupplier] = useState<SupplierXml | null>(null);

  async function readFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const xmlString = event.target?.result as string;

        resolve(xmlString);
      };
      reader.readAsText(file);
    });
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const xml = await readFile(file);

      const xmlDom = new DOMParser().parseFromString(xml, "text/xml");

      const products = xmlDom.querySelectorAll("det");
      const issuer = xmlDom.querySelector("emit");

      setProducts([]);
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

        const newProduct = new ProductXml(
          code,
          description,
          ncm,
          price,
          quantity
        );
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      });

      const supplierName = issuer?.querySelector("xNome")?.textContent || "";
      const supplierTaxId = issuer?.querySelector("CNPJ")?.textContent || "";

      setSupplier(new SupplierXml(supplierName, supplierTaxId));
    }
  }

  async function handleImportClick() {
    if (supplier) {
      let supplierEntity = await getSupplierByTaxId({
        taxId: supplier.taxId,
        companyId,
      });

      if (!supplierEntity) {
        supplierEntity = await createSupplier({
          name: supplier.name,
          taxId: supplier.taxId,
          companyId,
        });
      }

      for (const product of products) {
        let productEntity = await getProductBySupplierCode(
          product.code,
          supplierEntity.id
        );

        if (!productEntity) {
          let productEntity = await createProduct({
            companyId,
            costPrice: product.price,
            name: product.description,
            salePrice: product.price,
            supplierId: supplierEntity.id,
            supplierCode: product.code,
            ncm: product.ncm,
          });
        }
      }

      toast({
        variant: "default",
        title: "Produtos importados com sucesso",
      });

      router.push(`/dashboard/${clientId}/company/${companyId}/products`);
    }
  }

  const hasSupplier = supplier !== null;
  const hasProducts = products.length > 0;

  const hasDocumentSelected = hasProducts && hasSupplier;

  const documentAmount = products
    .map((product) => product.price * product.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Importar produtos"} />

      <div className="grid grid-cols-4">
        <Input type="file" accept=".xml" onChange={handleFileChange} />

        <div className="grid gap-2">
          <Label>CD</Label>

          <ComboboxCellule.Root
            trigger={
              <ComboboxCellule.Trigger placeholder="Selecione o fornecedor">
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
            {storagesList.map((supplier) => (
              <ComboboxCellule.Item
                onSelect={() => setStorageSelected(supplier)}
                selected={storageSelected?.id === supplier.id}
                value={supplier.name}
                key={supplier.id}
              >
                {supplier.name}
              </ComboboxCellule.Item>
            ))}
          </ComboboxCellule.Root>
        </div>
      </div>

      {hasSupplier && (
        <Card>
          <CardHeader>
            <CardTitle>Fornecedor</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-2 text-sm">
            <div>
              <p>Nome:</p>
              <p>CNPJ:</p>
            </div>
            <div className="text-foreground/70">
              <p>{supplier.name}</p>
              <p>{cnpjFormat(supplier.taxId!)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasProducts && (
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>NCM</TableHead>
                  <TableHead>Valor UN.</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.ncm}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      {(product.price * product.quantity).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell>
                    {documentAmount.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            <Button
              disabled={!hasDocumentSelected}
              onClick={() => handleImportClick()}
            >
              Importar
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
