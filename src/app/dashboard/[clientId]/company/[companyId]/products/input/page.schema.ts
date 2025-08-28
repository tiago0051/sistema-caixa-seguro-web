import { z } from "zod";

const ProductSchema = z.object({
  supplierCode: z.string().nullable(),
  ncm: z.string().min(1, "O NCM é obrigatório"),
  name: z.string().min(1, "A descrição é obrigatório"),
  costPrice: z.number().min(0, "O preço de custo é obrigatório"),
  salePrice: z.number().min(0, "O preço de venda é obrigatório"),
  quantity: z.number().min(1, "A quantidade é obrigatório"),
  productId: z.string().nullable(),
  storageQuantity: z.number().nullable(),
});

const SupplierSchema = z.object({
  description: z.string(),
  name: z.string().min(1, "A razão social é obrigatório"),
  taxId: z.string().min(1, "O CNPJ/CPF é obrigatório"),
  supplierId: z.string().nullable(),
});

export const InputFormSchema = z.object({
  storage: z.custom<IStorage>(),
  supplier: SupplierSchema,
  products: z.record(z.string(), ProductSchema),
});

export type InputFormValues = z.infer<typeof InputFormSchema>;
