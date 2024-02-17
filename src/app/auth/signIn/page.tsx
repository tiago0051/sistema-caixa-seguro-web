"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignIn() {
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    router.push("/dashboard/counter");
  }

  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seja bem-vindo</h2>
        <p className="text-base text-center">
          Insira seu CPF e senha para entrar no sistema
        </p>
      </div>

      <form onSubmit={(event) => onSubmit(event)} className="grid gap-4 w-full">
        <div className="grid gap-2">
          <Label>CPF</Label>
          <Input />
        </div>
        <div className="grid gap-2">
          <Label>Senha</Label>
          <Input />
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
