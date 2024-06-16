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
        email: { label: "Email", type: "text", placeholder: "이메일 주소 입력해주세요." },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('------------1111-----------------------'+JSON.stringify(credentials));

        //로그인처리
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        console.log('------------조회 user'+JSON.stringify(user));

        const {rcode} = user;

        if(rcode== '00'){
          if (user) {
            return user
          }
        }
        else if(rcode== '10'){
          throw new Error('비밀번호가 잘못되었습니다.') // If password is wrong

        }
        else if(rcode== '90'){
          throw new Error('존재하지 않는 E-mail입니다.') // If password is wrong
        }

        //console.log('------------조회 rcode='+JSON.stringify(rcode));

        // If no error and we have user data, return it
        if (user) {
          return user
        }
        //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        return null
      }
    })


    // ...add more providers here
  ],
  callbacks: {
    async signIn({user: {id, name, image, email}}) {

      console.log('callbacks 실행');
      
      if(!email) {
        return false;
      }
      console.log('return true');
      return true;
    },
    async session({ session, token }) {
      
      const user = session?.user;
      console.log('user='+user);
      if(user) {
        //image가 구글 로그인일때만 가져와서 강제로 하드코딩
        session.user = {
          ...user,
          image: 'https://lh3.googleusercontent.com/a/ACg8ocIy0Em7K7RVkLK70p_DGt68JWVSaGPQL5GF0Br9d8LIgKY=s96-c',
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
    error: '/auth/signin'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions};