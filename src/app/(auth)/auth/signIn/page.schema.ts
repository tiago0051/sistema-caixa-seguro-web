import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export type FormSchemaType = z.infer<typeof formSchema>;
