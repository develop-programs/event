import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

            }
        })
    ],
    pages: {
        signIn: "/api/auth/signin",
        newUser: "/api/auth/newuser",
    }
})

export { handler as GET, handler as POST }