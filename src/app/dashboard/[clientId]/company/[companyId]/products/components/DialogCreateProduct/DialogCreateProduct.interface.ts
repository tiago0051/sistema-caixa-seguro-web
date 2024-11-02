import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DialogCreateProductSchema } from "./DialogCreateProduct.schema";
import { z } from "zod";

export interface DialogCreateProductServiceReturn {
  form: UseFormReturn<z.infer<typeof DialogCreateProductSchema>>;
  isLoading: boolean;
  isOpen: boolean;
  onChangeIsOpen: (isOpenCB: boolean) => void;
  onSubmit: SubmitHandler<z.infer<typeof DialogCreateProductSchema>>;
}

export interface DialogCreateProductViewProps {
  suppliersList: SupplierI[];
}
