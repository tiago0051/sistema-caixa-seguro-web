import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

export default function TransactionsListPage() {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de transações</h1>
      </div>
      <div className="grid grid-cols-6 gap-8 grid-rows-6 h-full">
        <div className="grid gap-8 col-span-2 border border-separate rounded-lg p-8 row-span-2">
          <div>
            <h2 className="text-base">Saldo em caixa</h2>
            <p className="text-4xl">
              <span className="text-2xl text-foreground/50">R$ </span>300,00
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <h2 className="text-base">Entrada</h2>
              <p className="text-2xl">
                <span className="text-sm text-foreground/50">R$ </span>300,00
              </p>
            </div>
            <div>
              <h2 className="text-base">Saída</h2>
              <p className="text-2xl">
                <span className="text-sm text-foreground/50">R$ </span>300,00
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 border border-separate rounded-lg p-8 grid gap-4 row-span-4">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar tipo movimentação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Recebimento</SelectItem>
                  <SelectItem value="dark">Venda</SelectItem>
                  <SelectItem value="system">Outros</SelectItem>
                  <SelectItem value="system">Estorno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Tipo movimentação</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar tipo movimentação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Aporte</SelectItem>
                  <SelectItem value="dark">Sangria</SelectItem>
                  <SelectItem value="system">Transferência</SelectItem>
                  <SelectItem value="system">Estorno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Método</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Pix</SelectItem>
                  <SelectItem value="dark">TED</SelectItem>
                  <SelectItem value="system">Dinheiro</SelectItem>
                  <SelectItem value="system">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Buscar</Button>
          </div>
          <Separator />
          <div>
            <Table>
              <TableCaption>Lista de movimentações</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Cod.</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {new Array(10).fill({}).map((v, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>{moment().format("DD/MM/YY")}</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
