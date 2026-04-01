import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';
import { z } from 'zod';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { appEnv, assertProductionAuthEnv } from '@/lib/config/env';

assertProductionAuthEnv();

const credentialsSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: appEnv.authSecret,
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        if (email === appEnv.demoUserEmail.toLowerCase() && password === appEnv.demoUserPassword) {
          return {
            id: 'demo-user',
            email: appEnv.demoUserEmail,
            name: appEnv.demoUserName,
            role: 'admin',
            carbonPoints: 1280,
          };
        }

        const connection = await dbConnect();
        if (!connection) {
          return null;
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user?.password) {
          return null;
        }

        const passwordsMatch = await verify(user.password, password);
        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          carbonPoints: user.carbonPoints ?? 0,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.carbonPoints = user.carbonPoints ?? 0;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? 'user';
        session.user.carbonPoints = token.carbonPoints ?? 0;
      }
      return session;
    },
  },
});



