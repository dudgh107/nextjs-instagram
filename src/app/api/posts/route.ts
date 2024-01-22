import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsOf } from "@/service/posts";
import { widthSessionUser } from "@/app/utils/session";

export async function GET() {
    
    return widthSessionUser(async (user) => 
        getFollowingPostsOf(user.username).then((data) =>NextResponse.json(data))
    );
    
    
}


export async function POST(request: NextRequest) {
    
    return widthSessionUser(async (user) => {
        const form = await request.formData();
        const text = form.get('text')?.toString();
        const file = form.get('file') as Blob;

        if(!text || !file) {
            return new NextResponse('Bad Request', {status:400});
        }

        return createPost(user.id, text, file).then((data) =>NextResponse.json(data));
    });


    
}
