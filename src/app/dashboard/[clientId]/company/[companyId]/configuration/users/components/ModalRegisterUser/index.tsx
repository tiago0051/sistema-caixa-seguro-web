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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { registerUserDomain, updateUserDomain } from "@/domain/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FiEdit, FiLoader } from "react-icons/fi";
import { z } from "zod";
import { TableBranches } from "./components/tableBranches";

interface ModalRegisterUserProps {
  branches: BranchI[];
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
  branchesId: z.array(z.string().uuid()),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ModalRegisterUser({ branches }: ModalRegisterUserProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchesId: [],
      email: "",
      name: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const submitHandler: SubmitHandler<FormSchemaType> = async (data) => {
    let error = false;

    if (data.branchesId.length === 0) {
      error = true;
      toast({
        variant: "destructive",
        description: "O usuário tem que possuir no mínimo uma filial",
      });
    }

    if (error) return;

    const response = await registerUserDomain(
      data.name,
      data.email,
      data.branchesId
    );
    if (!response) {
      setIsOpen(false);
      toast({
        title: "Sucesso",
        description: "Usuário salvo com sucesso!",
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
            Cadastre um novo usuário para acessar a plataforma
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="data">Dados</TabsTrigger>
                <TabsTrigger value="branches">Filiais</TabsTrigger>
              </TabsList>
              <TabsContent value="data">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome"
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
              </TabsContent>
              <TabsContent value="branches">
                <FormField
                  control={form.control}
                  name="branchesId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TableBranches
                          branches={branches}
                          branchesSelectedId={field.value}
                          onChange={(branchesId) => field.onChange(branchesId)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

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
