'use client'
import { HomeUser, ProfileUser } from '@/model/user';
import React, { useState, useTransition } from 'react';
import useMe from '@/hooks/me';
import { useRouter } from 'next/navigation';
import GridSpinner from '../ui/GridSpinner';

export default function SignupPopup() {

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    });

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        //signIn(credentalsId, {callbackUrl});
        //이메일, 패스워드 저장
        //pasword

        const {email, password,confirmpassword} = signup;

        if(email == ''){
            alert('이메일을 입력하세요.');
            return false;
        }
        if(password == ''){
            alert('패스워드를 입력하세요.');
            return false;
        }

        const pwCondition = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;


        const pwPwValid = pwCondition.test(password);
        //alert(password);
        //alert(pwPwValid);


        if(!pwPwValid) { //형식에 맞지 않을 경우 아래 콘솔 출력
            //console.log('비밀번호 형식을 확인해주세요');
            alert('비밀번호가 안맞아요.');
            return;
        }else{ // 맞을 경우 출력
            //console.log('비밀번호 형식이 맞아요');
        }


        if(password != confirmpassword){
            alert('패스워드를 확인하세요');

        }
        else {
            //alert('패스워드가 잘 맞습니다.');
        }


        const bcrypt = require('bcryptjs');
        setLoading(true);
        //저장
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({...signup, password:await bcrypt.hash(password, 10)})
        }).then(res => {
            if(!res.ok) {
                setError('등록중 에러가 발생했습니다.');
                return;
            }
        })
            .catch(err => setError('등록중 에러가 발생했습니다.'))
            .finally(() => setLoading(false));

    }
    return (
        <>

            <form className="h-full" onSubmit={handleSubmit}>
                <div className="h-full bg-gradient-to-r from-purple-600 via-blue-400 to-green-200 flex justify-item-center">
                    <div className="w-3/4 h-3/4 m-auto rounded-lg bg-white py-8 px-7">
                        {loading && <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'><GridSpinner/></div>}
                        {
                            error && <p className='w-full bg-red-100 text-red-500 text-center p-4 mb-4 font-bold'>{error}</p>
                        }
                        <h1 className="text-4xl font-bold text-gray-600 text-center">Create account</h1>
                        <div className="mt-3 text-center text-base font-medium text-gray-500">Already have account? <a className="underline text-purple-600" href="#">Sign in</a></div>
                        <div className="w-full mt-6">
                            <div className="w-full mt-4">
                                <input type="email" className="w-full py-2.5 px-4 rounded-lg bg-gray-100 focus:shadow focus:bg-white focus:outline-none" id="email" name="email" placeholder="Email"
                                       value={signup.email}
                                       onChange={e=> setSignup({...signup , email : e.target.value})}
                                />
                            </div>
                            <div className="w-full  mt-4 flex justify-between">
                                <input type="password" className="bg-gray-100 w-6/12 py-2.5 px-4 rounded-l-lg border-r-2 border-white focus:shadow focus:bg-white focus:outline-none" id="password" name="pasword" placeholder="Password"
                                       value={signup.password}
                                       onChange={e=> setSignup({...signup , password : e.target.value})}
                                />
                                <input type="password" className="bg-gray-100 w-6/12 py-2.5 px-4 rounded-r-lg border-l-2 border-white focus:shadow focus:bg-white focus:outline-none" id="confirmpassword" name="confirmpassword" placeholder="Confirm password"
                                       value={signup.confirmpassword}
                                       onChange={e=> setSignup({...signup , confirmpassword : e.target.value})}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <button id="signup" className="w-full font-normal text-xl text-white bg-purple-400 py-2.5 rounded-lg">Sign up</button>
                            </div>
                            <div className="w-full mt-5">
                                <label className="inline-flex items-center font-medium">
                                    <input type="checkbox" className="h-5 w-5"/><span className="ml-2 text-gray-500">I have read and agree to the</span><span className="text-purple-500">&nbsp;Term of Service</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
}
