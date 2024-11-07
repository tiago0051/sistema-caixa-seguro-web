import { SubmitHandler, useForm } from "react-hook-form";
import {
  DialogCreateDistributionCenterSchema,
  DialogCreateDistributionCenterSchemaType,
} from "./DialogCreateDistributionCenter.schema";
import {
  DialogCreateDistributionCenterServiceProps,
  DialogCreateDistributionCenterServiceReturn,
} from "./DialogCreateDistributionCenter.interface";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { createStorage } from "@/services/domain/storage";
import { useRouter } from "next/navigation";

export const DialogCreateDistributionCenterService = ({
  clientId,
  companyId,
  productId,
}: DialogCreateDistributionCenterServiceProps): DialogCreateDistributionCenterServiceReturn => {
  const router = useRouter();

  const form = useForm<DialogCreateDistributionCenterSchemaType>({
    resolver: zodResolver(DialogCreateDistributionCenterSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = z.string().uuid().safeParse(productId).success;

  const onSubmit: SubmitHandler<
    DialogCreateDistributionCenterSchemaType
  > = async (data) => {
    const { name } = data;

    setIsLoading(true);

    await createStorage({
      companyId,
      name,
    });

    toast({
      title: "Sucesso",
      description: "CD criado com sucesso!",
    });

    setIsOpen(false);
    setIsLoading(false);

    form.reset();

    router.refresh();
  };

  return {
    form,
    isEditing,
    isLoading,
    isOpen,
    onChangeIsOpen: (isOpenCB) => setIsOpen(isOpenCB),
    onSubmit,
  };
};
