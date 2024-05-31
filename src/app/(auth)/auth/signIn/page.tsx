"use client";

import SignInView from "./page.view";
import { SignInService } from "./page.service";

export default function SignIn() {
  const signInService = SignInService();

  return <SignInView {...signInService} />;
}
