"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTablePaginatedProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
}

export function DataTablePaginated<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  pagination,
  onPaginationChange,
}: DataTablePaginatedProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange,
    pageCount,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <Pagination className="my-2">
          <PaginationContent>
            {pagination.pageIndex > 0 && (
              <PaginationItem onClick={() => table.setPageIndex(0)}>
                <PaginationPrevious className="pointer-events-none" href="#" />
              </PaginationItem>
            )}
            {pagination.pageIndex - 1 > 0 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {table.getCanPreviousPage() && (
              <PaginationItem onClick={() => table.previousPage()}>
                <PaginationLink className="pointer-events-none" href="#">
                  {pagination.pageIndex}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink className="pointer-events-none" href="#" isActive>
                {pagination.pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
            {pagination.pageIndex < table.getPageCount() - 1 && (
              <PaginationItem onClick={() => table.nextPage()}>
                <PaginationLink className="pointer-events-none" href="#">
                  {pagination.pageIndex + 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {pagination.pageIndex + 1 < table.getPageCount() && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pagination.pageIndex < table.getPageCount() - 1 && (
              <PaginationItem
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                <PaginationNext className="pointer-events-none" href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
