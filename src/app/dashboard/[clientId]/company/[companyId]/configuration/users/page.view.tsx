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

export function UsersListView({ users }: UsersListViewProps) {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <div>
          <ModalRegisterUser />
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
              <Label>Código de barras</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Nome do produto</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Nome do fabricante</Label>
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
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[100px]">Cod.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">
                    #{user.id.split("-")[0]}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
