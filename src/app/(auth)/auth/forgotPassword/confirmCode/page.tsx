"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent } from "react";

export default function ConfirmCodePage() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Podemos te ajudar</h2>
        <p className="text-base text-center">
          Insira seu CPF para recuperar sua senha
        </p>
      </div>

      <form onSubmit={(event) => onSubmit(event)} className="grid gap-4 w-full">
        <div className="grid gap-2">
          <Label>Código</Label>
          <Input />
        </div>
        <div className="grid gap-2">
          <Label>Nova senha</Label>
          <Input type="password" />
        </div>
        <div className="grid gap-2">
          <Label>Confirmar nova senha</Label>
          <Input type="password" />
        </div>
        <Button type="submit">Alterar senha</Button>
        <Button type="submit" variant="outline">
          Reenviar código
        </Button>
        <Link href="/auth/signIn" className="text-center">
          <Button variant="link">Voltar para a tela de entrada</Button>
        </Link>
      </form>
    </div>
  );
}
