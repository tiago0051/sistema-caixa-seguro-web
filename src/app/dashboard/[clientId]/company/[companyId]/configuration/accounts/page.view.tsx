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
import { Suspense } from "react";
import { AccountsListTableBodySkeleton } from "./components/accountsListTableBodySkeleton";
import { AccountsListTableBody } from "./components/accountsListTableBody";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModalRegisterAccounts } from "./components/modalRegisterAccounts";

export function AccountsView({ companyId }: AccountsViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contas do caixa</CardTitle>
        <CardDescription>
          Lista de contas para lançamento de movimentações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-[350px_auto] gap-4">
          <div className="sm:border-r sm:border-separate gap-6 sm:pr-4 flex flex-col">
            <h3 className="font-semibold">Pesquise pela conta</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Código</Label>
                <Input />
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Input />
              </div>
              <Button variant="outline">Filtrar</Button>
            </div>
          </div>
          <div className="grid">
            <Table>
              <TableCaption>Lista de contas.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Cod.</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead> </TableHead>
                </TableRow>
              </TableHeader>
              <Suspense fallback={<AccountsListTableBodySkeleton />}>
                <AccountsListTableBody companyId={companyId} />
              </Suspense>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <ModalRegisterAccounts />
      </CardFooter>
    </Card>
  );
}
