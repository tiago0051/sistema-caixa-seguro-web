import { UsersListServiceReturn } from "./page.interface";
import { getUsersList } from "@/repository/user";

export async function usersListService({
  params,
}: {
  params: { companyId: string };
}): Promise<UsersListServiceReturn> {
  const users = await getUsersList(params.companyId);

  return {
    users,
  };
}
