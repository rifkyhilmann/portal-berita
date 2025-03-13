import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/utils/prisma";
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email dan password harus diisi!");
                }
                
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })

                if (!user) {
                    throw new Error('Email belum terdaftar!!!');
                }

                const isPasswordValid = credentials?.password ? await bcrypt.compare(credentials.password, user.password) : false;

                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                return { ...user };
            }
        })
    ],
    pages: {
        signIn: '/sign-in', // Optional, customize the login page
    },
    session: {
        strategy: 'jwt', // Use JWT for sessions
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Tentukan secret untuk menandatangani token
        maxAge: 24 * 60 * 60, // 24 jam (dalam detik)
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
            };
            return session;
        },
    },
})

export { handler as GET, handler as POST }