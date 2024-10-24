import { getSuppliersList } from "@/services/domain/supplier";
import { FC } from "react";
import { DialogCreateProductView } from "./DialogCreateProduct.view";

interface DialogCreateProductProps {
  companyId: string;
}

export const DialogCreateProduct: FC<DialogCreateProductProps> = async ({
  companyId,
}) => {
  const suppliersList = await getSuppliersList({ companyId });

  return <DialogCreateProductView suppliersList={suppliersList} />;
};
