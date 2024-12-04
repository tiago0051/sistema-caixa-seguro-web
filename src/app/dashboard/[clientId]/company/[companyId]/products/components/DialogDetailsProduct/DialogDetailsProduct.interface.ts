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
  onChangeIsOpen: (isOpenCB: boolean) => void;
}

export interface DialogDetailsProductViewProps {
  product: ProductI;
  productStoragesList: ProductStorageI[];
  storagesList: IStorage[];
}
