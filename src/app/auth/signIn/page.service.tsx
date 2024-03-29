import { SignInDTO } from "./page.dto";
import { useToast } from "@/components/ui/use-toast";
import { authenticateAction } from "@/app/actions/services/authHook";
import { useFormState } from "react-dom";
import { IEmployee } from "@/types/employee/employee";
import { ActionResponse } from "@/app/actions/interfaces/action.interface";
import { useEffect } from "react";

export function SignInService(): SignInDTO {
  const { toast } = useToast();

  const [state, formAction] = useFormState<ActionResponse<IEmployee>, FormData>(
    authenticateAction,
    {}
  );

  useEffect(() => {
    if (state.error)
      toast({
        title: "Problema na autenticação",
        description: state.error.message,
        variant: "destructive",
      });
  }, [state, toast]);

  return {
    formAction,
  };
}
