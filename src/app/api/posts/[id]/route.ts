import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { getFollowingPostsOf, getPost } from "@/service/posts";
import { authOptions } from "@/app/utils/authOptions";
import { widthSessionUser } from "@/app/utils/session";

type Context = {
    params : {id: string};
}
export const dynamic = 'force-dynamic';
export async function GET(_: NextRequest, context: Context) {

    return widthSessionUser(async () => 
        getPost(context.params.id).then((data) =>NextResponse.json(data))
    );

}


