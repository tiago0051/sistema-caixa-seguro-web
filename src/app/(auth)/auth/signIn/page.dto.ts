import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "./page.schema";

export interface SignInDTO {
  formSubmit: SubmitHandler<FormSchemaType>;
  form: UseFormReturn<FormSchemaType>;
}
