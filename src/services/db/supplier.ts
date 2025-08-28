import prisma from "../services/prisma";

interface GetSuppliersListDBProps {
  companyId: string;
}

interface GetSupplierByTaxIdDBProps {
  taxId: string;
  companyId: string;
}

interface CreateSupplierDBProps {
  name: string;
  taxId: string;
  companyId: string;
  description: string;
}

export async function getSuppliersListDB({
  companyId,
}: GetSuppliersListDBProps) {
  const suppliersListDB = await prisma.supplier.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      companyId,
    },
  });

  return suppliersListDB.map((supplierDB) => supplierMap(supplierDB));
}

export async function getSupplierByTaxIdDB({
  taxId,
  companyId,
}: GetSupplierByTaxIdDBProps) {
  const supplier = await prisma.supplier.findUnique({
    where: {
      taxId,
      companyId,
    },
  });

  return supplier ? supplierMap(supplier) : null;
}

export async function createSupplierDB({
  name,
  taxId,
  companyId,
  description,
}: CreateSupplierDBProps) {
  const supplier = await prisma.supplier.create({
    data: {
      name,
      taxId,
      companyId,
      description,
    },
  });

  return supplierMap(supplier);
}

interface SupplierMapProps {
  id: string;
  name: string;
  taxId: string | null;
  description: string;
}

function supplierMap({
  id,
  name,
  taxId,
  description,
}: SupplierMapProps): SupplierI {
  return {
    id,
    name,
    taxId,
    description,
  };
}
