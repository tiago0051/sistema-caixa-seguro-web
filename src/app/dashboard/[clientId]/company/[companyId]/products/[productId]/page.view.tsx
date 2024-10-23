"use client";
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
import { HeaderOrganism } from "@/components/organisms/Header";
import { ComboboxCellule } from "@/components/cellules/Combobox";
import { RegisterProductService } from "./page.service";

export function RegisterProductView({
  suppliersList,
}: RegisterProductViewProps) {
  const { form, isEditing, onSubmit } = RegisterProductService();

  return (
    <section>
      <HeaderOrganism
        showBackButton={true}
        title={isEditing ? "Editar Produto" : "Cadastrar Produto"}
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-3 md:grid-cols-3 md:max-w-screen-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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

            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Fornecedor</FormLabel>
                  <FormControl>
                    <ComboboxCellule.Root
                      trigger={
                        <ComboboxCellule.Trigger placeholder="Selecione o fornecedor">
                          {
                            suppliersList.find(
                              (supplier) => supplier.id === field.value
                            )?.name
                          }
                        </ComboboxCellule.Trigger>
                      }
                      searchEmpty="Fornecedor não encontrado"
                      searchPlaceholder="Pesquise pelo fornecedor"
                    >
                      {suppliersList.map((supplier) => (
                        <ComboboxCellule.Item
                          onSelect={() => field.onChange(supplier.id)}
                          selected={field.value === supplier.id}
                          value={supplier.name}
                          key={supplier.id}
                        >
                          {supplier.name}
                        </ComboboxCellule.Item>
                      ))}
                    </ComboboxCellule.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full max-w-40">
            {isEditing ? "Salvar" : "Cadastrar"}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
