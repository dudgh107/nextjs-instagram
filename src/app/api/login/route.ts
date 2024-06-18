import { saveMember } from '@/service/mariadb';
import { NextRequest, NextResponse } from "next/server";
import {createUser} from "@/service/posts";
import {inquireUser} from "@/service/user";


export async function POST(request: NextRequest) {

        const {email, password} = await request.json();
        console.log('login--');
        console.log(email);
        console.log(password);

        const userInfo = await inquireUser(email);

        //console.log('login--2>>length='+userInfo.length);
        console.log('userInfo='+JSON.stringify(userInfo));

        if(userInfo) {
                const user = userInfo;

                console.log('password='+password);
                console.log('user.password='+user.password);
                const userResponse = {
                        id: user.id,
                        password: user.password,
                        username: user.username,
                        name: user.name,
                        email: user.email
                };
                var bcrypt = require('bcryptjs');
                if(await bcrypt.compare(password, user.password)){

                        return NextResponse.json({...userResponse, 'rcode':'00'});
                }else
                {
                        //비밀번호 안맞을때
                      return NextResponse.json({'rcode':'10'}); //비밀번호틀림
                }
        }

        // throw an error or return a response if the login failed
        return NextResponse.json({'rcode':'90'});       //email미존재
}


