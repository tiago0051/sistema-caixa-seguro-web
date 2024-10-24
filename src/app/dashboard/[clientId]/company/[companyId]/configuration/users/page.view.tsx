import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersListViewProps } from "./page.interface";
import { UsersListTableBody } from "./components/usersListTableBody";
import { Suspense } from "react";
import { UsersListTableBodySkeleton } from "./components/usersListTableBodySkeleton";
import { ModalRegisterUser } from "./components/ModalRegisterUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UsersListView({ branches, params }: UsersListViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários</CardTitle>
        <CardDescription>
          Lista de usuários vinculádos a empresas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-[350px_auto] gap-4">
          <div className="sm:border-r sm:border-separate gap-6 sm:pr-4 flex flex-col">
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
              <Button variant={"outline"}>Filtrar</Button>
            </div>
          </div>
          <div className="grid">
            <Table>
              <TableCaption>Lista de Usuários.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Cod.</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead> </TableHead>
                </TableRow>
              </TableHeader>
              <Suspense fallback={<UsersListTableBodySkeleton />}>
                <UsersListTableBody
                  branches={branches}
                  companyId={params.companyId}
                />
              </Suspense>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <ModalRegisterUser branches={branches} />
      </CardFooter>
    </Card>
  );
}
