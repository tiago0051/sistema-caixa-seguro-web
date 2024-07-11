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
  branchesId: string[]
) {
  const userAlreadyExists = await getUserByEmail(email);

  if (userAlreadyExists) {
    return `Já existe um usuário com o e-mail '${email}'`;
  }
  await registerUser(name, email, branchesId);
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
