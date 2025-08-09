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
import { createProduct } from "@/services/domain/product";
import { SupplierXml } from "./types/SupplierXml";
import { useParams } from "next/navigation";
import { cnpjFormat } from "@/utils/stringFormat";

export default function ImportProductsPage() {
  const { companyId } = useParams() as {
    companyId: string;
  };

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

      products.forEach((product) => {
        const prod = product.querySelector("prod");

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

        const newProduct = new ProductXml(description, ncm, price, quantity);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      });

      const supplierName = issuer?.querySelector("xNome")?.textContent || "";
      const supplierTaxId = issuer?.querySelector("CNPJ")?.textContent || null;

      setSupplier(new SupplierXml(supplierName, supplierTaxId));
    }
  }

  async function handleImportClick() {
    for (const product of products) {
      await createProduct({
        companyId,
        costPrice: product.price,
        name: product.description,
        salePrice: product.price,
        supplierId,
      });
    }
  }

  const hasSupplier = supplier !== null;
  const hasProducts = products.length > 0;

  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Importar produtos"} />

      <div className="grid grid-cols-4">
        <Input type="file" accept=".xml" onChange={handleFileChange} />
      </div>

      {hasSupplier && (
        <div>
          <h3>Fornecedor</h3>
          <p>Nome: {supplier.name}</p>
          <p>CNPJ: {cnpjFormat(supplier.taxId!)}</p>
        </div>
      )}

      {hasProducts && (
        <>
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
            </TableBody>
          </Table>

          <div className="flex justify-end">
            <Button>Importar</Button>
          </div>
        </>
      )}
    </div>
  );
}
