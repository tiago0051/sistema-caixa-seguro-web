import { dbClient } from "./prismaClient";

export async function getAccountsListDB(companyId: string) {
  const accountsListDB = await dbClient.account.findMany({
    where: {
      companyId,
    },
    select: {
      id: true,
      description: true,
      type: true,
      companyId: true,
      inactive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return accountsListDB;
}
