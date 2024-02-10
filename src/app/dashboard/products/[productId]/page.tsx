"use client";

import { Button } from "@/components/ui/button";
import { ComboboxCategories } from "@/components/ui/combobox-categories";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyInput } from "@/components/ui/currency-input";

const ProductsSchema = z.object({
  name: z.string(),
  manufacturer: z.string(),
  category: z.string(),
  costValue: z.number(),
  saleValue: z.number(),
  amount: z.number(),
});

interface RegisterProductPageProps {
  params: {
    productId: string;
  };
}

export default function RegisterProductPage({
  params,
}: RegisterProductPageProps) {
  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ProductsSchema>> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div>
          <Button disabled>Salvar</Button>
        </div>
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
            name="manufacturer"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Fabricante</FormLabel>
                <FormControl>
                  <Input placeholder="Nome fabricante do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <ComboboxCategories
                    value={field.value}
                    setValue={(value) => (field.value = value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costValue"
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
            name="saleValue"
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
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
