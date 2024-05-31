import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL("/auth/signIn", req.nextUrl.origin);
    signInUrl.searchParams.append("callbackUrl", req.url);

    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|images|favicon.ico).*)"],
};
