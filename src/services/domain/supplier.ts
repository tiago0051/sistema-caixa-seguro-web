"use server";

import {
  createSupplierDB,
  getSupplierByTaxIdDB,
  getSuppliersListDB,
} from "../db/supplier";

interface GetSuppliersListDB {
  companyId: string;
}

interface GetSupplierByTaxId {
  taxId: string;
  companyId: string;
}

interface CreateSupplier {
  name: string;
  taxId: string;
  companyId: string;
}

export async function getSuppliersList({ companyId }: GetSuppliersListDB) {
  const suppliersList = await getSuppliersListDB({ companyId });

  return suppliersList;
}

export async function getSupplierByTaxId({
  taxId,
  companyId,
}: GetSupplierByTaxId) {
  const supplier = await getSupplierByTaxIdDB({ taxId, companyId });

  return supplier;
}

export async function createSupplier({
  name,
  taxId,
  companyId,
}: CreateSupplier) {
  const supplier = await createSupplierDB({ name, taxId, companyId });

  return supplier;
}
