import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          name: "J Smith",
          username: "admin",
        };
        if (
          credentials?.username === user.username &&
          credentials.password === "12345678"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/errors",
  },
  callbacks: {
    async jwt(params) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log({ params });
      return params?.token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
