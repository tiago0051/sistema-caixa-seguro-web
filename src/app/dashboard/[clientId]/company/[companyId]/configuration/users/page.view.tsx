import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersListViewProps } from "./page.interface";
import { ModalRegisterUser } from "./components/ModalRegisterUser";
import { UsersListTableBody } from "./components/usersListTableBody";
import { Suspense } from "react";
import { UsersListTableBodySkeleton } from "./components/usersListTableBodySkeleton";

export function UsersListView({ branches, params }: UsersListViewProps) {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <div>
          <ModalRegisterUser branches={branches} />
        </div>
      </div>
      <div className="grid grid-cols-[350px_auto]">
        <div className="border-r border-separate mr-4 grid gap-6 pr-4">
          <h3 className="font-semibold">Pesquise pelo usuário</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Código</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>E-mail</Label>
              <Input />
            </div>
            <Button>Filtrar</Button>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Lista de Usuários.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cod.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
              </TableRow>
            </TableHeader>
            <Suspense fallback={<UsersListTableBodySkeleton />}>
              <UsersListTableBody companyId={params.companyId} />
            </Suspense>
          </Table>
        </div>
      </div>
    </div>
  );
}
