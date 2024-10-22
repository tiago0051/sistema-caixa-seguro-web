import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationOrganismProps {
  searchParams: Record<string, string>;
  totalPages: number;
}

export const PaginationOrganism: FC<PaginationOrganismProps> = ({
  searchParams,
  totalPages,
}) => {
  const params = new URLSearchParams(searchParams);
  const totalPagesIndex = totalPages - 1;

  const page = params.get("page") ? Number(params.get("page")) : 0;

  params.delete("page");

  function generatePageLink(pageNumber: number) {
    return params.toString()
      ? `?${params.toString()}&page=${pageNumber}`
      : `?page=${pageNumber}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 0 && (
          <PaginationItem>
            <PaginationPrevious href={generatePageLink(0)} />
          </PaginationItem>
        )}
        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 0 && (
          <PaginationItem>
            <PaginationLink href={generatePageLink(page - 1)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href="#">
            {page + 1}
          </PaginationLink>
        </PaginationItem>
        {page < totalPagesIndex && (
          <PaginationItem>
            <PaginationLink href={generatePageLink(page + 1)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 1 < totalPagesIndex && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < totalPagesIndex && (
          <PaginationItem>
            <PaginationNext href={generatePageLink(totalPagesIndex)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
