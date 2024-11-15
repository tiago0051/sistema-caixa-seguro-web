"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createProduct } from "@/services/domain/product";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { DialogDetailsProductSchema } from "./DialogDetailsProduct.schema";
import {
  DialogDetailsProductServiceProps,
  DialogDetailsProductServiceReturn,
} from "./DialogDetailsProduct.interface";
import { useState } from "react";

export function DialogDetailsProductService({
  productStoragesList,
}: DialogDetailsProductServiceProps): DialogDetailsProductServiceReturn {
  const { companyId, productId } = useParams() as {
    clientId: string;
    companyId: string;
    productId: string;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storagesList, setStoragesList] =
    useState<ProductStorageI[]>(productStoragesList);

  const form = useForm<z.infer<typeof DialogDetailsProductSchema>>({
    resolver: zodResolver(DialogDetailsProductSchema),
    defaultValues: {
      costAmount: 0,
      name: "",
      saleAmount: 0,
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof DialogDetailsProductSchema>
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
      description: "Produto salvo com sucesso!",
    });

    setIsOpen(false);

    setIsLoading(false);
  };

  function changeProductStorageQuantity(storageId: string, quantity: number) {
    setStoragesList((prevState) => {
      const array = [...prevState];

      const storageIndex = array.findIndex(
        (productStorage) => productStorage.storageId === storageId
      );

      array[storageIndex].quantity = quantity;

      return array;
    });
  }

  return {
    changeProductStorageQuantity,
    form,
    isLoading,
    isOpen,
    storagesList,
    onSubmit,
    onChangeIsOpen: (isOpenCB) => setIsOpen(isOpenCB),
  };
}
