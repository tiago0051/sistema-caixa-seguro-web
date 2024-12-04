import { getSuppliersList } from "@/services/domain/supplier";
import { FC } from "react";
import { DialogDetailsProductView } from "./DialogDetailsProduct.view";
import { getProduct, getProductStoragesList } from "@/services/domain/product";
import { getStoragesList } from "@/services/domain/storage";

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
  const { items: storagesList } = await getStoragesList({
    companyId,
    take: null,
    searchParams: {},
  });

  if (!product) return <></>;

  return (
    <DialogDetailsProductView
      product={product}
      productStoragesList={productStoragesList}
      storagesList={storagesList}
    />
  );
};
