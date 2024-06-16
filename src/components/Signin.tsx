'use client';
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";
import { FaGoogle } from 'react-icons/fa';
import React, {useCallback, useRef, useState} from 'react';
import ModealPortal from './ui/ModealPortal';
import SignupPopup from './login/SignupPopup';
import LoginModal from './login/LoginModal';
import GridSpinner from "@/components/ui/GridSpinner";
import {useRouter} from "next/navigation";


type Props = {
    providers : Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | {},
    callbackUrl : string
}
export default function Signin({providers, callbackUrl}: Props) {
    const [login, setLogin] = useState('');
    const [error, setError] = useState<string | undefined | null>();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement >(null);
    const passwordRef = useRef<HTMLInputElement >(null);
    const router = useRouter();

    let credentalsId = '';
    let googleId = '';

    for(var i=0; i < Object.values(providers).length; i++){
        let name = Object.values(providers)[i].name;

        console.log('name='+name);

        if(name == 'Credentials'){
            credentalsId = Object.values(providers)[i].id;
        }
        else if(name == 'Google'){
            googleId = Object.values(providers)[i].id;
        }
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        //signIn(credentalsId, {emailRef : emailRef.current?.value, passwordRef:await bcrypt.hash(passwordRef.current?.value, 10), callbackUrl});



        if(emailRef.current?.value == ''){
            alert('E-MAIL을 입력하세요.');
            return false;
        }

        if(passwordRef.current?.value == ''){
            alert('패스워드를 입력하세요.');
            return false;
        }

        setLoading(true);
        const result = await signIn(credentalsId, {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            redirect: false,
            callbackUrl: callbackUrl,
        }).catch(err => setError('로그인중 에러가 발생했습니다.'))
            .finally(() => setLoading(false));

        //console.log('------------signIn결과 user'+JSON.stringify(result?.error));
        //const {error : string} = result;
        //const resultString = JSON.stringify(result);

        if(result && 'error' in result){
            setError(result.error);
        }


        if(!error)
        {
            router.push('/')
        }

    }
    const handleGoogleLogin = async (e:any) => {
        e.preventDefault();
        signIn(googleId, {callbackUrl});
    }

    const handleCloseModel = useCallback(() => {
        setOpenModel(false);
    }, []);

    const [openModel, setOpenModel] = useState(false);

    return (
        <>
            {/* 회원가입 폼*/}
            <section>
                <div className="flex justify-center items-center min-h-500">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center text-white">
      <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
        LogIn
      </span>
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    <i className="fas fa-envelope mr-2"></i>Email
                                </label>
                                <div>
                                    <input id="email" type="email" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email"
                                           ref={emailRef}
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                    <i className="fas fa-lock mr-2"></i>Password
                                </label>
                                <div>
                                    <input id="password" type="password" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password"
                                           ref={passwordRef}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                    LogIn
                                </button>
                            </div>
                            <div className="text-center mt-4">
                                <a href="#" className="text-gray-600 hover:underline">Forgot password?</a>
                            </div>
                            {loading && <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'><GridSpinner/></div>}
                            {
                                error && <p className='w-full bg-red-100 text-red-500 text-center p-4 mb-4 font-bold'>{error}</p>
                            }
                        </form>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="text-center text-gray-600 mt-6">Don't have an account? <a href="#" onClick={()=> setOpenModel(true)} className="text-blue-500 hover:underline">Sign up</a></p>
                        <div className="mt-4">
                            <p className="text-center text-gray-600">Or log in with:</p>
                            <div className="flex justify-center mt-2">
                                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" onClick={handleGoogleLogin} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
                                    <FaGoogle className='w-4 h-4'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {
                openModel && <ModealPortal>
                    <LoginModal onClose={() => setOpenModel(false)}>
                        <SignupPopup closeModel={handleCloseModel}/>
                    </LoginModal>
                </ModealPortal>
            }

        </>
    );
}

