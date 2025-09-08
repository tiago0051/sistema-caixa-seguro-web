"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useParams } from "next/navigation";
import { getProductsList } from "@/services/domain/product";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useDebounceValue } from "usehooks-ts";
import { DataTablePaginated } from "@/components/ui/data-table-paginated";
import { getColumns } from "./columns";

type DialogSelectProductProps = {
  onProductSelect: (product: ProductI) => void;
  defaultSearchValue?: string;
};

const DEBOUNCE_DELAY = Number(process.env.NEXT_PUBLIC_DEBOUNCE_DELAY);

export const DialogSelectProduct: FC<DialogSelectProductProps> = ({
  onProductSelect,
  defaultSearchValue,
}) => {
  const params = useParams();
  const companyId = params.companyId as string;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useDebounceValue(
    defaultSearchValue || "",
    DEBOUNCE_DELAY
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const findPaginatedProductsQuery = useQuery({
    queryKey: ["findPaginatedProducts", companyId, search, pagination],
    queryFn: async () =>
      await getProductsList({
        companyId,
        searchParams: {
          productName: search,
        },
        take: pagination.pageSize,
        page: pagination.pageIndex,
      }),
    enabled: open,
  });

  const products = findPaginatedProductsQuery.data?.items || [];
  const columns = getColumns({
    selectProduct: (product) => {
      setOpen(false);
      onProductSelect(product);
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-primary text-lg p-2 absolute">
          <FiSearch />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lista de produtos</DialogTitle>
          <DialogDescription>Selecione o produto</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {defaultSearchValue && (
            <p className="text-sm">
              <b>Valor anterior: </b>
              {defaultSearchValue}
            </p>
          )}
          <div>
            <Input
              placeholder="Nome do produto"
              defaultValue={defaultSearchValue}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>

          <DataTablePaginated
            columns={columns}
            data={products}
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={findPaginatedProductsQuery.data?.totalPages}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
