import { DialogCreateDistributionCenterProps } from "./DialogCreateDistributionCenter.interface";
import { DialogCreateDistributionCenterView } from "./DialogCreateDistributionCenter.view";

export function DialogCreateDistributionCenter({
  clientId,
  companyId,
  productId,
}: DialogCreateDistributionCenterProps) {
  return (
    <DialogCreateDistributionCenterView
      clientId={clientId}
      companyId={companyId}
      productId={productId}
    />
  );
}
