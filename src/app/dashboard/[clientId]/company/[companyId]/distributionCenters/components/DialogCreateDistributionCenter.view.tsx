"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import { DialogCreateDistributionCenterViewProps } from "./DialogCreateDistributionCenter.interface";
import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogCreateDistributionCenterService } from "./DialogCreateDistributionCenter.service";

export const DialogCreateDistributionCenterView: FC<
  DialogCreateDistributionCenterViewProps
> = ({ clientId, companyId, productId }) => {
  const { form, isEditing, isLoading, isOpen, onChangeIsOpen, onSubmit } =
    DialogCreateDistributionCenterService({ clientId, companyId, productId });

  return (
    <Dialog onOpenChange={(state) => onChangeIsOpen(state)} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar CD</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar centro de distribuição</DialogTitle>
          <DialogDescription>
            Crie centro de distribuições para vincular produtos
          </DialogDescription>
        </DialogHeader>

        <section>
          <FormProvider {...form}>
            <form
              id="hook-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-3 md:grid-cols-2 md:max-w-screen-sm">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do CD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </FormProvider>
        </section>

        <DialogFooter>
          <Button
            type="submit"
            form="hook-form"
            disabled={isLoading}
            className="w-full max-w-40"
          >
            {isEditing ? "Salvar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
