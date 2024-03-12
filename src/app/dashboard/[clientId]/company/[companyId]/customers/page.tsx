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

export default function CustomersPage() {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div>
          <Button>Adicionar cliente</Button>
        </div>
      </div>
      <div className="grid grid-cols-[350px_auto]">
        <div className="border-r border-separate mr-4 grid gap-6 pr-4">
          <h3 className="font-semibold">Pesquise pelo cliente</h3>
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
              <Label>CPF</Label>
              <Input />
            </div>
            <Button>Filtrar</Button>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Lista de clientes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[100px]">Cod.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Jorge Luiz</TableCell>
                <TableCell>655.526.500-00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">2FG3D</TableCell>
                <TableCell>Jorge Luiz</TableCell>
                <TableCell>655.526.500-00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
