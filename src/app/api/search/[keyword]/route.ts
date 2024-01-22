import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { getFollowingPostsOf, getPost } from "@/service/posts";
import { authOptions } from "@/app/utils/authOptions";
import { searchUsers } from "@/service/user";

type Context = {
    params : {keyword: string};
}
export async function GET(_: NextRequest, context: Context) {
    
    return searchUsers(context.params.keyword).then((data) =>NextResponse.json(data));
}


