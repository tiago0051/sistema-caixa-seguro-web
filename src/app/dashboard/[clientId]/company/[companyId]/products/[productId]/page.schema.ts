import { z } from "zod";

export const RegisterProductSchema = z.object({
  name: z.string(),
  costAmount: z.coerce.number(),
  saleAmount: z.coerce.number(),
  supplierId: z.string().uuid(),
});
