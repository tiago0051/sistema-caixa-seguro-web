import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DialogDetailsProductSchema } from "./DialogDetailsProduct.schema";
import { z } from "zod";

export interface DialogDetailsProductServiceReturn {
  form: UseFormReturn<z.infer<typeof DialogDetailsProductSchema>>;
  isEditing: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onChangeIsOpen: (isOpenCB: boolean) => void;
  onSubmit: SubmitHandler<z.infer<typeof DialogDetailsProductSchema>>;
}

export interface DialogDetailsProductViewProps {
  product: ProductI;
  suppliersList: SupplierI[];
}
