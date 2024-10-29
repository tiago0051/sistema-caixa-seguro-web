import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DialogCreateStorageSchema } from "./DialogCreateStorage.schema";
import { z } from "zod";

export interface DialogCreateStorageServiceReturn {
  form: UseFormReturn<z.infer<typeof DialogCreateStorageSchema>>;
  isEditing: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onChangeIsOpen: (isOpenCB: boolean) => void;
  onSubmit: SubmitHandler<z.infer<typeof DialogCreateStorageSchema>>;
}

export interface DialogCreateStorageViewProps {
  suppliersList: SupplierI[];
}
