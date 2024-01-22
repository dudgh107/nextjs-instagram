
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next"
  import { getProviders, signIn } from "next-auth/react"
  import { getServerSession } from "next-auth/next"
  import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from "next/dist/server/api-utils";
import Signin from "@/components/Signin";

type Props = {
    searchParams: {
        callbackUrl : string
    }
}
export  default async function SignPage({searchParams:{callbackUrl}}:Props) {
    const session = await getServerSession(authOptions)
    
    if(session) {
        redirect: { destination: "/" }
    }

    const providers = (await getProviders()) ?? {};
  

    return (
        <section className="flex justify-center mt-24">
          <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />  
        </section>
    );
}


