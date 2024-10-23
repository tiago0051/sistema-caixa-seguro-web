import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { RegisterProductSchema } from "./page.schema";
import { z } from "zod";

export interface RegisterProductServiceReturn {
  form: UseFormReturn<z.infer<typeof RegisterProductSchema>>;
  isEditing: boolean;
  onSubmit: SubmitHandler<z.infer<typeof RegisterProductSchema>>;
}

export interface RegisterProductViewProps {
  form: UseFormReturn<z.infer<typeof RegisterProductSchema>>;
  isEditing: boolean;
  onSubmit: SubmitHandler<z.infer<typeof RegisterProductSchema>>;
}
