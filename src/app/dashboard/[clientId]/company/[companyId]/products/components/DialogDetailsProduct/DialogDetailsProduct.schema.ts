import { z } from "zod";

export const DialogDetailsProductSchema = z.object({
  name: z.string(),
  costAmount: z.coerce.number(),
  saleAmount: z.coerce.number(),
  supplierId: z.string().uuid(),
});
