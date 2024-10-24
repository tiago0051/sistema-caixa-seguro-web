import { getSuppliersList } from "@/services/domain/supplier";
import { FC } from "react";
import { DialogDetailsProductView } from "./DialogDetailsProduct.view";
import { getProduct } from "@/services/domain/product";

interface DialogDetailsProductProps {
  companyId: string;
  productId: string;
}

export const DialogDetailsProduct: FC<DialogDetailsProductProps> = async ({
  companyId,
  productId,
}) => {
  const suppliersList = await getSuppliersList({ companyId });
  const product = await getProduct(productId);

  if (!product) return <></>;

  return (
    <DialogDetailsProductView product={product} suppliersList={suppliersList} />
  );
};
