import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: { label: "Password", type: "password" },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              phone_Number: existingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            phone_Number: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "MY_SECRET",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.phone = user.phone_Number;
        token.name = user.name;
      }
      return token;
    },
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
        console.log("token : ", token);
      if (token) {
        session.user = {
          id: token.sub,
          phone: token.phone,
          name: token.name,
        };
      }
      return session;
    },
  },
};
