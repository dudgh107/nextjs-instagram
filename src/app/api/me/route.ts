import { NextResponse } from "next/server";
import { getUserByUsername } from "@/service/user";
import { widthSessionUser } from "@/app/utils/session";

export async function GET() {
    
    return widthSessionUser(async (user) => 
        getUserByUsername(user.username).then((data) =>NextResponse.json(data))
    );

    
}