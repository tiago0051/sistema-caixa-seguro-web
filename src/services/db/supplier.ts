import prisma from "../services/prisma";

interface GetSuppliersListDBProps {
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
