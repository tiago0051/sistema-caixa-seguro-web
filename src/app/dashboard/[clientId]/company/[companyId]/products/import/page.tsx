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

export default function ImportProductsPage() {
  const [products, setProducts] = useState<ProductXml[]>([]);

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
    }
  }

  return (
    <div className="grid gap-8">
      <HeaderOrganism title={"Importar produtos"} />

      <div className="grid grid-cols-4">
        <Input type="file" accept=".xml" onChange={handleFileChange} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>NCM</TableHead>
            <TableHead>Valor de custo</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.ncm}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
