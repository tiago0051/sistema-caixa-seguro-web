import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import "moment/locale/pt";
import Link from "next/link";

interface PreSalesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreSalesList({ isOpen, onClose }: PreSalesListProps) {
  moment.locale("pt-br");
  return (
    <Dialog open={isOpen} onOpenChange={(state) => !state && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pré-vendas</DialogTitle>
          <DialogDescription>
            Lista de pré-vendas salvas nos últimos 90 dias
          </DialogDescription>
        </DialogHeader>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cod.</TableHead>
                <TableHead>Data de criação</TableHead>
                <TableHead>Valor total</TableHead>
                <TableHead> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>4FR3SK</TableCell>
                <TableCell>{moment().format("DD MMMM YYYY")}</TableCell>
                <TableCell>R$ 700</TableCell>
                <TableCell className="text-right">
                  <Link
                    href="/dashboard/counter?preSale=123123cdsc"
                    className="text-primary"
                    onClick={() => onClose()}
                  >
                    Visualizar
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
