import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInDTO } from "./page.dto";
import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";
import { cpfMask } from "@/utils/stringFormat";

export default function SignInView({ formAction }: SignInDTO) {
  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seja bem-vindo</h2>
        <p className="text-base text-center">
          Insira seu CPF e senha para entrar no sistema
        </p>
      </div>

      <form action={formAction} className="grid gap-4 w-full">
        <FormChild />
      </form>
    </div>
  );
}

function FormChild() {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="grid gap-2">
        <Label>CPF</Label>
        <Input
          type="text"
          name="taxId"
          onChange={(e) => (e.target.value = cpfMask(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Senha</Label>
        <Input type="password" name="password" />
      </div>
      <div className="flex justify-end">
        <Link
          href="/auth/forgotPassword"
          className="hover:underline hover:text-blue-600"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? (
          <FiLoader
            data-loading={pending}
            className="data-[loading=true]:animate-spin"
          />
        ) : (
          "Entrar"
        )}
      </Button>
    </>
  );
}
