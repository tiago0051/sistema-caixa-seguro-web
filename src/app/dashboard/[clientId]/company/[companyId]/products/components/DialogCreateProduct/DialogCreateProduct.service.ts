"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createProduct } from "@/services/domain/product";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { DialogCreateProductSchema } from "./DialogCreateProduct.schema";
import { DialogCreateProductServiceReturn } from "./DialogCreateProduct.interface";
import { useState } from "react";

export function DialogCreateProductService(): DialogCreateProductServiceReturn {
  const { companyId } = useParams() as {
    companyId: string;
  };
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DialogCreateProductSchema>>({
    resolver: zodResolver(DialogCreateProductSchema),
    defaultValues: {
      costAmount: 0,
      name: "",
      saleAmount: 0,
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof DialogCreateProductSchema>
  > = async (data) => {
    const { costAmount, name, saleAmount, supplierId } = data;

    let error = false;

    if (saleAmount < costAmount) {
      form.setError("saleAmount", {
        message: "O valor de venda não pode ser menor que o valor de custo",
      });

      error = true;
    }

    if (error) return;

    setIsLoading(true);

    await createProduct({
      companyId,
      costPrice: costAmount,
      name,
      salePrice: saleAmount,
      supplierId,
    });

    toast({
      title: "Sucesso",
      description: "Produto criado com sucesso!",
    });

    setIsOpen(false);

    setIsLoading(false);
  };

  return {
    form,
    isLoading,
    isOpen,
    onSubmit,
    onChangeIsOpen: (isOpenCB) => setIsOpen(isOpenCB),
  };
}
