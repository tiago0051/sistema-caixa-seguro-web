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

const ProductsSchema = z.object({
  name: z.string(),
  manufacturer: z.string(),
  category: z.string(),
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
          className="grid grid-cols-4 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormDescription>
                  Nome que ficara visível em todo o sistema
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fabricante</FormLabel>
                <FormControl>
                  <Input placeholder="Nome fabricante do produto" {...field} />
                </FormControl>
                <FormDescription>
                  Empresa que fabricou o produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <ComboboxCategories
                    value={field.value}
                    setValue={(value) => (field.value = value)}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input placeholder="Quantidade do produto" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
