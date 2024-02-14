import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function TransactionsListPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de transações</h1>
        <div className="flex gap-2">
          <DatePickerWithRange />
          <Button>Buscar</Button>
        </div>
      </div>
    </div>
  );
}
