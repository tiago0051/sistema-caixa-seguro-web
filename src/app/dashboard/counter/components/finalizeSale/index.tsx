import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface FinalizeSaleProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FinalizeSale({ isOpen, onClose }: FinalizeSaleProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(state) => !state && onClose()}>
      <DialogContent>
        <DialogTitle>Finalizar venda</DialogTitle>
        <DialogDescription>Seleção do método de pagamento</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
