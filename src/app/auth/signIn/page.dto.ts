import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormInputs } from "./page.interface";

export interface SignInDTO {
  form: UseFormReturn<FormInputs>;
  onSubmit: SubmitHandler<FormInputs>;
}
