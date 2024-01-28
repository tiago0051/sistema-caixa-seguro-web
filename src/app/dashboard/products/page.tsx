import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
  return (
    <div>
      <Table>
        <TableCaption>Lista de produtos adicionados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[100px]">Cod.</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead className="text-right">Valor unitário</TableHead>
            <TableHead className="text-right">Valor total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">2FG3D</TableCell>
            <TableCell>Roupeiro Espanha 2P</TableCell>
            <TableCell>2</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">2FG3D</TableCell>
            <TableCell>Roupeiro Madri C/Espelho</TableCell>
            <TableCell>1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
