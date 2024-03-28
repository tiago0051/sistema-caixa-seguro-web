import { SignInDTO } from "./page.dto";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "./page.interface";
import { useToast } from "@/components/ui/use-toast";
import { authenticateAction } from "@/app/actions/services/authHook";
import { useFormState } from "react-dom";
import { IEmployee } from "@/types/employee/employee";

export function SignInService(): SignInDTO {
  const { toast } = useToast();

  const form = useForm<FormInputs>();
  const [state, formAction] = useFormState<IEmployee, FormInputs>(
    authenticateAction,
    null
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {};

  return {
    form,
    onSubmit,
  };
}
