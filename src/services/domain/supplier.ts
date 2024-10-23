import { getSuppliersListDB } from "../db/supplier";

interface GetSuppliersListDB {
  companyId: string;
}

export async function getSuppliersList({ companyId }: GetSuppliersListDB) {
  const suppliersList = await getSuppliersListDB({ companyId });

  return suppliersList;
}
