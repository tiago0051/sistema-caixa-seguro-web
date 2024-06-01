import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserWithPassword } from "./repository/user";
import { ZodError, z } from "zod";
import { compare, hash } from "bcryptjs";
import { getNameInitials } from "./utils/stringFormat";

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          firstName: session.user.name.split(" ")[0],
          id: token.sub,
          lastName: session.user.name.split(" ").pop(),
          name: session.user.name,
          nameInitials: getNameInitials(session.user.name),
          email: session.user.email,
        },
      };
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // console.log(await hash(password, 10));

          const user = await getUserWithPassword(email);

          if (!user)
            throw new CredentialsSignin("E-mail e/ou senha incorreto(s)");

          const isValidPassword = await compare(password, user.password);

          if (!isValidPassword)
            throw new CredentialsSignin("E-mail e/ou senha incorreto(s)");

          return {
            email: user.email,
            id: user.id,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;

          throw error;
        }
      },
    }),
  ],
});
