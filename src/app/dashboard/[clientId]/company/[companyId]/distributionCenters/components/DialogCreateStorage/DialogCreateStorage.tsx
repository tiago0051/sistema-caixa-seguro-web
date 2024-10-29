import { getSuppliersList } from "@/services/domain/supplier";
import { FC } from "react";
import { DialogCreateStorageView } from "./DialogCreateStorage.view";

interface DialogCreateStorageProps {
  companyId: string;
}

export const DialogCreateStorage: FC<DialogCreateStorageProps> = async ({
  companyId,
}) => {
  const suppliersList = await getSuppliersList({ companyId });

  return <DialogCreateStorageView suppliersList={suppliersList} />;
};
