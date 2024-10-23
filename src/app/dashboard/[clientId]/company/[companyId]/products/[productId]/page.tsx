import { RegisterProductView } from "./page.view";
import { RegisterProductService } from "./page.service";
import { getSuppliersList } from "@/services/domain/supplier";

export default async function RegisterProduct({ params }: { params: Params }) {
  const { companyId } = await params;

  const suppliersList = await getSuppliersList({ companyId });

  return <RegisterProductView suppliersList={suppliersList} />;
}
