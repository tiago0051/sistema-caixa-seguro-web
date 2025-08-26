import { FC } from "react";
import { InputSupplier } from "../types/InputSupplier";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InputProduct } from "../types/InputProduct";

type SupplierRowProps = {
  supplier: InputSupplier;
  products: InputProduct[];
};

export const SupplierRow: FC<SupplierRowProps> = ({ supplier, products }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        Fornecedor: {supplier.name}
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>NCM</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.code}>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.ncm}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
