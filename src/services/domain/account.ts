import { getAccountsListDB } from "../db/account";

export async function getAccountsList(companyId: string) {
  const accountsList = await getAccountsListDB(companyId);

  return accountsList;
}
