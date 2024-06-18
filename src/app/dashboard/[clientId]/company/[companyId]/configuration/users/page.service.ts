import { UsersListServiceData, UsersListServiceReturn } from "./page.interface";
import { getUserBranchesList } from "@/repository/user";
import { auth } from "@/auth";

export async function usersListService({
  params,
}: UsersListServiceData): Promise<UsersListServiceReturn> {
  const session = await auth();

  const branches = await getUserBranchesList(
    params.companyId,
    session!.user.id
  );

  return {
    branches,
  };
}
