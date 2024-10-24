import { domain } from "@/services/domain/domain";
import { RegisterProductView } from "./page.view";

export default async function RegisterProduct({ params }: { params: Params }) {
  const { companyId } = await params;

  const suppliersList = await domain.supplier.getSuppliersList({ companyId });

  return <RegisterProductView suppliersList={suppliersList} />;
}
