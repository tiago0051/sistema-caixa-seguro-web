import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider } from "react-hook-form";
import { RegisterProductViewProps } from "./page.interface";

export function RegisterProductView({
  form,
  isEditing,
  onSubmit,
}: RegisterProductViewProps) {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">Produtos</h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor custo</FormLabel>
                <FormControl>
                  <CurrencyInput {...field} placeholder="0,00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="saleAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor venda</FormLabel>
                <FormControl>
                  <CurrencyInput {...field} placeholder="0,00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isEditing ? "Salvar" : "Cadastrar"}</Button>
        </form>
      </FormProvider>
    </div>
  );
}
