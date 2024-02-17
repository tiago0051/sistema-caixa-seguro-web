import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function TransactionsListPage() {
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de transações</h1>
      </div>
      <div className="grid grid-cols-6">
        <div className="border-r border-separate col-span-1 h-full">
          <div>
            <h2>Saldo em caixa</h2>
            <p>
              <span>R$</span>300,00
            </p>
          </div>
        </div>
        <div className="col-span-5"></div>
      </div>
    </div>
  );
}
