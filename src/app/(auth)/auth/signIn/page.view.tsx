import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInDTO } from "./page.dto";
import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";

export default function SignInView({ formSubmit, form }: SignInDTO) {
  const { register, handleSubmit } = form;
  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seja bem-vindo</h2>
        <p className="text-base text-center">
          Insira seu CPF e senha para entrar no sistema
        </p>
      </div>

      <form onSubmit={handleSubmit(formSubmit)} className="grid gap-4 w-full">
        <fieldset className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" {...register("email")} />
        </fieldset>
        <fieldset className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input type="password" {...register("password")} />
        </fieldset>
        <div className="flex justify-end">
          <Link
            href="/auth/forgotPassword"
            className="hover:underline hover:text-blue-600"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
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
