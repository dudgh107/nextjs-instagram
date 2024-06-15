import { saveMember } from '@/service/mariadb';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

        const {email, password} = await request.json();

        console.log('11');
        console.log(email);
        console.log(password);

        //maria db save

        return saveMember(email, password).then((data) =>NextResponse.json(data));
}


