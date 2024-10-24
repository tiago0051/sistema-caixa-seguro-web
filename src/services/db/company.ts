import prisma from "../services/prisma";

export async function getCompany(companyId: string) {
  const companyDB = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return companyDB;
}
