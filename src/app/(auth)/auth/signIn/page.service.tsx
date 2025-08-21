"use client";

import { SignInDTO } from "./page.dto";
import { useToast } from "@/components/ui/use-toast";
import { authenticateAction } from "@/app/actions/services/authAction";
import { startTransition, useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema, FormSchemaType } from "./page.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInService(): SignInDTO {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    authenticateAction,
    undefined
  );

  const formSubmit: SubmitHandler<FormSchemaType> = (data: {
    [key: string]: string;
  }) => {
    const callbackUrl = searchParams.get("callbackUrl");

    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    if (callbackUrl) formData.append("redirectTo", callbackUrl);

    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (!isPending) {
      switch (state) {
        case "CredentialsSignin":
          toast({
            title: "Problema na autenticação",
            description: "E-mail e/ou senha incorreto(s).",
            variant: "destructive",
          });
          break;
      }
    }
  }, [isPending, state, toast]);

  return {
    formSubmit,
    form,
    isPending,
  };
}
