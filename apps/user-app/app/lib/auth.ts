import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Name: {
          label: "Name",
          type: "text",
          placeholder: "Raunak Jijotia",
        },
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        Email: {
          label: "Email Address",
          type: "email",
          placeholder: "abcd@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
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
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              name: credentials.Name,
              email: credentials.Email,
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            phone_Number: user.number,
            email: user.email,
            
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
