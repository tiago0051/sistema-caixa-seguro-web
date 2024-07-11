"use server";

import {
  getUserBranchesList,
  getUserByEmail,
  getUserById,
  linkUserToBranch,
  registerUser,
  updateUser,
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

export async function updateUserDomain(
  userId: string,
  name: string,
  email: string,
  branchesId: string[]
) {
  const user = await getUserById(userId);

  if (!user) return "Usuário não encontrado";

  if (user.email !== email) {
    const userAlreadyExists = await getUserByEmail(email);

    if (userAlreadyExists) return "E-mail já utilizado";
  }

  await updateUser(user.id, name, email, branchesId);
}
