'use client';
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
    providers : Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | {},
    callbackUrl : string
}
export default function Signin({providers, callbackUrl}: Props) {
    return (
        <>
        {Object.values(providers).map(({name, id}) => (
          <ColorButton key={id} 
          text={`Sign In With ${name}`}
          onClick={()=> signIn(id, {callbackUrl})}
          size='big'
          />
        ))}
      </>
    );
}

