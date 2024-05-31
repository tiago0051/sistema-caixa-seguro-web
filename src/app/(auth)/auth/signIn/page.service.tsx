import { SignInDTO } from "./page.dto";
import { useToast } from "@/components/ui/use-toast";
import { authenticateAction } from "@/app/actions/services/authAction";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchemaType } from "./page.schema";

export function SignInService(): SignInDTO {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const form = useForm<FormSchemaType>();

  const [errorMessage, dispatch] = useFormState(authenticateAction, undefined);

  const formSubmit: SubmitHandler<FormSchemaType> = (data: {
    [key: string]: string;
  }) => {
    const callbackUrl = searchParams.get("callbackUrl");

    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    if (callbackUrl) formData.append("redirectTo", callbackUrl);

    dispatch(formData);
  };

  useEffect(() => {
    if (errorMessage)
      toast({
        title: "Problema na autenticação",
        description: errorMessage,
        variant: "destructive",
      });
  }, [errorMessage, toast]);

  return {
    formSubmit,
    form,
  };
}
