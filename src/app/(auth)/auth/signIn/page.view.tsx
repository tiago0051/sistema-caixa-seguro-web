"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInDTO } from "./page.dto";
import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignInView({ formSubmit, form, isPending }: SignInDTO) {
  const { register, handleSubmit } = form;
  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seja bem-vindo</h2>
        <p className="text-base text-center">
          Insira seu e-mail e senha para entrar no sistema
        </p>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        noValidate
        className="grid gap-4 w-full"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <div className="flex justify-end">
          <Link
            href="/auth/forgotPassword"
            className="hover:underline hover:text-blue-600"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <FiLoader
            data-loading={isPending}
            className="data-[loading=true]:animate-spin"
          />
        ) : (
          "Entrar"
        )}
      </Button>
    </>
  );
}
