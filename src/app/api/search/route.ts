import { NextResponse } from "next/server";
import { getFollowingPostsOf } from "@/service/posts";
import { searchUsers } from "@/service/user";

export const dynamic = 'force-dynamic';
 
export async function GET() {
    
        return searchUsers().then((data) =>NextResponse.json(data));
}
