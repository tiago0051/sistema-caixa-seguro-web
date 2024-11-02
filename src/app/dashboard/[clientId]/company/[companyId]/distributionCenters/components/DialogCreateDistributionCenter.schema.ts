import { z } from "zod";

export const DialogCreateDistributionCenterSchema = z.object({
  name: z.string().min(5),
});

export type DialogCreateDistributionCenterSchemaType = z.infer<
  typeof DialogCreateDistributionCenterSchema
>;
