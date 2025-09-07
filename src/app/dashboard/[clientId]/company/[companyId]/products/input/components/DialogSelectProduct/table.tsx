"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function Table({
  listProducts = [],
}: {
  listProducts: ProductI[];
}) {
  return <DataTable columns={columns} data={listProducts} />;
}
