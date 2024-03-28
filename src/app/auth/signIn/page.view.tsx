"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInDTO } from "./page.dto";

export default function SignInView({ form, onSubmit }: SignInDTO) {
  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seja bem-vindo</h2>
        <p className="text-base text-center">
          Insira seu CPF e senha para entrar no sistema
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 w-full"
      >
        <div className="grid gap-2">
          <Label>CPF</Label>
          <Input {...form.register("taxId")} type="text" />
        </div>
        <div className="grid gap-2">
          <Label>Senha</Label>
          <Input {...form.register("password")} type="password" />
        </div>
        <div className="flex justify-end">
          <Link
            href="/auth/forgotPassword"
            className="hover:underline hover:text-blue-600"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
