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
}: CreateSupplierDBProps) {
  const supplier = await prisma.supplier.create({
    data: {
      name,
      taxId,
      companyId,
    },
  });

  return supplierMap(supplier);
}

interface SupplierMapProps {
  id: string;
  name: string;
}

function supplierMap({ id, name }: SupplierMapProps) {
  return {
    id,
    name,
  };
}
