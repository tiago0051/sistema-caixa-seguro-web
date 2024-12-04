"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createProduct } from "@/services/domain/product";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
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
  const [productStoragesListChanges, setProductStoragesListChanges] = useState<
    ProductStorageI[]
  >([]);

  const form = useForm<z.infer<typeof DialogDetailsProductSchema>>({
    resolver: zodResolver(DialogDetailsProductSchema),
    defaultValues: {
      costAmount: 0,
      name: "",
      saleAmount: 0,
    },
  });

  function changeProductStorageQuantity(storageId: string, quantity: number) {
    setProductStoragesListChanges((prevState) => {
      const array = [...prevState];

      const storageIndex = array.findIndex(
        (productStorage) => productStorage.storageId === storageId
      );

      array[storageIndex].quantity = quantity;

      return array;
    });
  }

  function createProductStorage(storageId: string, quantity: number) {}

  return {
    changeProductStorageQuantity,
    form,
    isLoading,
    isOpen,
    onChangeIsOpen: (isOpenCB) => setIsOpen(isOpenCB),
  };
}
