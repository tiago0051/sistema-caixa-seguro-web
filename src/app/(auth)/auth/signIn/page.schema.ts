import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido",
  }),
  password: z
    .string()
    .min(1, {
      message: "Senha é obrigatória",
    })
    .max(32),
});

export type FormSchemaType = z.infer<typeof formSchema>;
