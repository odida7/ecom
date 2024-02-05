import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';

export const {
    auth, 
    signIn,
    handlers:{GET, POST},
  } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            async authorize(credential){
                await connectDB();
                const user = await User.findOne({
                    username: credential?.username,
                    password: credential?.password,
                })  
               if (!user) return null;
               return user;
            },
        }),
    ],

    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login", 
    },

    callbacks: {
        jwt: async ({ token, user}) => {
            if (user) {
                token = user;
            }
            return token;
        },
        session: async ({ session, token}) => {
            if (session?.user) {
                session.user = token;
            }
            return session;
        }
    }
})