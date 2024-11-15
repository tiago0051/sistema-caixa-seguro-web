import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DialogDetailsProductSchema } from "./DialogDetailsProduct.schema";
import { z } from "zod";

export interface DialogDetailsProductServiceProps {
  productStoragesList: ProductStorageI[];
}

export interface DialogDetailsProductServiceReturn {
  changeProductStorageQuantity: (storageId: string, quantity: number) => void;
  form: UseFormReturn<z.infer<typeof DialogDetailsProductSchema>>;
  isLoading: boolean;
  isOpen: boolean;
  storagesList: ProductStorageI[];
  onChangeIsOpen: (isOpenCB: boolean) => void;
  onSubmit: SubmitHandler<z.infer<typeof DialogDetailsProductSchema>>;
}

export interface DialogDetailsProductViewProps {
  product: ProductI;
  productStoragesList: ProductStorageI[];
}
