import { saveMember } from '@/service/mariadb';
import { NextRequest, NextResponse } from "next/server";
import {createUser} from "@/service/posts";


export async function POST(request: NextRequest) {

        const {id, username, email, password} = await request.json();

        console.log('11');
        console.log(id);
        console.log(username);
        console.log(email);
        console.log(password);

        //maria db save

        return createUser(id, username, email, password).then((data) =>NextResponse.json(data));
}


