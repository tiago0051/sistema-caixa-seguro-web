"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticateAction(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") as string | undefined;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectTo || "/",
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type;
    }

    throw error;
  }
}

export async function authenticationSignOutAction() {
  await signOut();
}
