import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ModalRegisterAccounts() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar conta</DialogTitle>
          <DialogDescription>
            Adicione contas para vincular movimentações no caixa
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
