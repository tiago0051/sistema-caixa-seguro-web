import { dbClient } from "./prismaClient";

export async function getCompany(companyId: string) {
  const companyDB = await dbClient.company.findUnique({
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
