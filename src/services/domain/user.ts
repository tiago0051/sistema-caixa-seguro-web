"use server";

import {
  getUserByEmail,
  getUserById,
  getUsersList,
  registerUser,
  updateUser,
} from "@/services/db/user";
import { sendEmailService } from "../services/amazonSes";
import { firstAccessEmailTemplate } from "../templates/email/firstAccesEmailTemplate";

export async function registerUserDomain(
  name: string,
  email: string,
  branchesId: string[]
) {
  const userAlreadyExists = await getUserByEmail(email);

  if (userAlreadyExists) {
    return `Já existe um usuário com o e-mail '${email}'`;
  }

  const user = await registerUser(name, email, branchesId);

  await sendEmailFirstAccessDomain(user);
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

export async function getUsersListDomain(companyId: string) {
  const usersList = await getUsersList(companyId);

  return usersList;
}

export async function sendEmailFirstAccessDomain(user: UserI) {
  const emailTo = user.email;
  const body = firstAccessEmailTemplate(process.env.PUBLIC_URL!);
  const subject = "Primeiro acesso";

  await sendEmailService(emailTo, body, subject);
}
