"use client";

import { Button } from "@/components/ui/button";
import { shortId } from "@/utils/stringFormat";
import { ColumnDef } from "@tanstack/react-table";

type GetColumnsProps = {
  selectProduct: (product: ProductI) => void;
};

export const getColumns = ({
  selectProduct,
}: GetColumnsProps): ColumnDef<ProductI>[] => [
  {
    accessorKey: "id",
    header: "Cod.",
    cell: ({ row }) => (
      <Button
        variant={"link"}
        size={"sm"}
        onClick={() => selectProduct(row.original)}
        className="text-xs text-primary"
      >
        #{shortId(row.original.id)}
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Descrição",
    cell: ({ row }) => <p className="text-sm truncate">{row.original.name}</p>,
  },
  {
    accessorKey: "supplierName",
    header: "Fornecedor",
    cell: ({ row }) => (
      <p className="text-sm truncate">{row.original.supplierName}</p>
    ),
  },
];
