import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterProductSchema } from "./page.schema";
import { createProduct } from "@/services/domain/product";
import { RegisterProductServiceReturn } from "./page.interface";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";

export function RegisterProductService(): RegisterProductServiceReturn {
  const { clientId, companyId, productId } = useParams() as {
    clientId: string;
    companyId: string;
    productId: string;
  };
  const router = useRouter();

  const isEditing = z.string().uuid().safeParse(productId).success;

  const form = useForm<z.infer<typeof RegisterProductSchema>>({
    resolver: zodResolver(RegisterProductSchema),
    defaultValues: {
      costAmount: 0,
      name: "",
      saleAmount: 0,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterProductSchema>> = async (
    data
  ) => {
    const { costAmount, name, saleAmount } = data;

    let error = false;

    if (saleAmount < costAmount) {
      form.setError("saleAmount", {
        message: "O valor de venda não pode ser menor que o valor de custo",
      });

      error = true;
    }

    if (error) return;

    if (!isEditing) {
      await createProduct(companyId, costAmount, name, saleAmount);

      toast({
        title: "Sucesso",
        description: "Produto salvo com sucesso!",
      });

      router.push(`/dashboard/${clientId}/company/${companyId}/products`);
    }
  };

  return { form, isEditing, onSubmit };
}
