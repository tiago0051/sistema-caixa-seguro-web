"use server";

import {
  getUserBranchesList,
  getUserByEmail,
  linkUserToBranch,
  registerUser,
} from "@/repository/user";

export async function registerUserDomain(
  name: string,
  email: string,
  companyId: string,
  branchId: string
) {
  const userAlreadyExists = await getUserByEmail(email);

  if (userAlreadyExists) {
    const userBranchList = await getUserBranchesList(
      companyId,
      userAlreadyExists.id
    );

    if (userBranchList.some((branch) => branch.id === branchId))
      return `Já existe um usuário com o e-mail '${email}'`;

    await linkUserToBranch(userAlreadyExists.id, branchId);
  } else {
    await registerUser(name, email, branchId);
  }
}
