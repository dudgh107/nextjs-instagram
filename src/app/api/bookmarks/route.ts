import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/service/user";
import { widthSessionUser } from "@/app/utils/session";

export async function PUT(req:NextRequest) {
    
    return widthSessionUser(async (user) => {
        const {id, bookmark} = await req.json();

        if(!id || bookmark === null) {
            return new Response('Bad Request', {status: 400});
        }

        const request = bookmark ? addBookmark : removeBookmark;

        return request(user.id, id).then(res => NextResponse.json(res))
        .catch(error => new Response(JSON.stringify(error), {status: 500}));
    });
    
}



