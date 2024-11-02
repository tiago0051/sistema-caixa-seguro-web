import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DialogCreateDistributionCenterSchemaType } from "./DialogCreateDistributionCenter.schema";

export interface DialogCreateDistributionCenterProps {
  clientId: string;
  companyId: string;
  productId?: string;
}
export interface DialogCreateDistributionCenterViewProps {
  clientId: string;
  companyId: string;
  productId?: string;
}

export interface DialogCreateDistributionCenterServiceProps {
  clientId: string;
  companyId: string;
  productId?: string;
}

export interface DialogCreateDistributionCenterServiceReturn {
  form: UseFormReturn<DialogCreateDistributionCenterSchemaType>;
  isEditing: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onChangeIsOpen: (isOpenCB: boolean) => void;
  onSubmit: SubmitHandler<DialogCreateDistributionCenterSchemaType>;
}
