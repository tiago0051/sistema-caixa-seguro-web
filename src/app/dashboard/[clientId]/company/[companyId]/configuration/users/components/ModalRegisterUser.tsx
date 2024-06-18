"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { registerUserDomain } from "@/domain/user";
import { BranchI } from "@/types/branch/branch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";

interface ModalRegisterUserProps {
  branches: BranchI[];
  companyId: string;
}

const formSchema = z.object({
  name: z.string().min(5, {
    message: "O nome tem que ter mais de 4 caracteres.",
  }),
  email: z
    .string({
      required_error: "O E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  branchId: z.string().uuid(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ModalRegisterUser({
  branches,
  companyId,
}: ModalRegisterUserProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const submitHandler: SubmitHandler<FormSchemaType> = async (data) => {
    const response = await registerUserDomain(
      data.name,
      data.email,
      companyId,
      data.branchId
    );

    if (!response) {
      setIsOpen(false);

      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso!",
      });

      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: response,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen]);

  return (
    <Dialog onOpenChange={(state) => setIsOpen(state)} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar usuário</DialogTitle>
          <DialogDescription>
            Adicione novos usuários para acessarem o sistema
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o e-mail"
                      type="email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      name={field.name}
                      disabled={field.disabled}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <>
      <Button type="submit" disabled={formStatus.pending}>
        {formStatus.pending ? (
          <FiLoader
            data-loading={formStatus.pending}
            className="data-[loading=true]:animate-spin"
          />
        ) : (
          "Salvar"
        )}
      </Button>
    </>
  );
}
