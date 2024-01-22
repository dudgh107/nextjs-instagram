import { getLikedOf, getPostOf, getSavedOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        slug: string[];

    }
}
export const dynamic = 'force-dynamic';
export async function GET(_: NextRequest, context: Context) {
    const {slug} = context.params;

    if(!slug || !Array.isArray(slug) || slug?.length < 2) {
        return new NextResponse('Bad Request', {status:400});
    }

    const [username, query] = slug;

    let request = getPostOf;

    if(query === 'saved') {
        request = getSavedOf;
    } else if (query === 'liked') {
        request = getLikedOf;
    }

    return request(username).then(data => NextResponse.json(data));
     
}