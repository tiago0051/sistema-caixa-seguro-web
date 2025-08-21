import { FC } from "react";
import { DialogDetailsProductView } from "./DialogDetailsProduct.view";
import { getProduct, getProductStoragesList } from "@/services/domain/product";

interface DialogDetailsProductProps {
  companyId: string;
  productId: string;
}

export const DialogDetailsProduct: FC<DialogDetailsProductProps> = async ({
  companyId,
  productId,
}) => {
  const product = await getProduct(productId);
  const productStoragesList = await getProductStoragesList({ productId });

  if (!product) return <></>;

  return (
    <DialogDetailsProductView
      product={product}
      productStoragesList={productStoragesList}
    />
  );
};
