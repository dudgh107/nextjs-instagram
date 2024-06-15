import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions :NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('------------1111-----------------------'+JSON.stringify(req));
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        // If no error and we have user data, return it
        if (user) {
          return user
        }

        return null
      }
    })


    // ...add more providers here
  ],
  callbacks: {
    async signIn({user: {id, name, image, email}}) {
      
      
      if(!email) {
        return false;
      }
      addUser({id, name: name || '', image, email, username: email?.split('@')[0] || ''});
      return true;
    },
    async session({ session, token }) {
      
      const user = session?.user;
      
      if(user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        }
      }

      return session
    },
    async jwt({token, user}) {
      if(user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions};